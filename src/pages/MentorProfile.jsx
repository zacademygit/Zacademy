// src/pages/MentorProfile.jsx

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Briefcase, ArrowLeft, Calendar, Clock, X, MessageCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthProvider';

const API_BASE_URL = import.meta.env.VITE_API_URL

const MentorProfile = () => {
    const { mentorId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [mentor, setMentor] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [hasExistingBooking, setHasExistingBooking] = useState(false);
    const [checkingBooking, setCheckingBooking] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);

    useEffect(() => {
        fetchMentorProfile();
        fetchMentorServices();
        fetchMentorAvailability();
    }, [mentorId]);

    // Check for existing booking when user is authenticated
    useEffect(() => {
        if (user && mentorId) {
            checkExistingBooking();
        }
    }, [user, mentorId]);

    // Check for saved booking data after registration
    useEffect(() => {
        const savedMentorId = sessionStorage.getItem('redirectToMentor');
        const savedDate = sessionStorage.getItem('bookingDate');
        const savedTime = sessionStorage.getItem('bookingTime');

        if (savedMentorId === mentorId && savedDate && savedTime && user) {
            // Restore booking selections
            setSelectedDate(savedDate);
            setSelectedTime(savedTime);

            // Show welcome toast
            toast.success(`Hello ${user.firstName}! You can continue with booking.`, {
                duration: 4000
            });
        }
    }, [user, mentorId]);

    // Fetch booked slots when date changes
    useEffect(() => {
        if (selectedDate && mentorId) {
            fetchBookedSlots();
        } else {
            setBookedSlots([]);
        }
    }, [selectedDate, mentorId]);

    // Generate available times when date or booked slots change
    useEffect(() => {
        if (selectedDate && availability) {
            generateAvailableTimes();
        } else {
            setAvailableTimes([]);
        }
    }, [selectedDate, availability, bookedSlots]);

    const fetchMentorProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/mentors/${mentorId}`);

            if (response.data.success) {
                setMentor(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching mentor profile:', error);
            toast.error('Failed to load mentor profile');
            navigate('/mentors');
        } finally {
            setLoading(false);
        }
    };

    const fetchMentorServices = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/mentors/${mentorId}/services`);

            if (response.data.success) {
                setServices(response.data.data);
                // Auto-select first service if available
                if (response.data.data.length > 0) {
                    setSelectedService(response.data.data[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching mentor services:', error);
            // Don't show error toast - services might not be set up yet
        }
    };

    const fetchMentorAvailability = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/mentors/${mentorId}/availability`);

            if (response.data.success && response.data.data) {
                setAvailability(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching mentor availability:', error);
        }
    };

    const checkExistingBooking = async () => {
        setCheckingBooking(true);
        try {
            const response = await axios.get(`/api/bookings/check/${mentorId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                setHasExistingBooking(response.data.hasBooking);
            }
        } catch (error) {
            console.error('Error checking existing booking:', error);
            // Don't show error toast - just silently fail
        } finally {
            setCheckingBooking(false);
        }
    };

    const fetchBookedSlots = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/bookings/booked-times/${mentorId}`, {
                params: { date: selectedDate }
            });

            if (response.data.success) {
                setBookedSlots(response.data.bookedSlots);
            }
        } catch (error) {
            console.error('Error fetching booked slots:', error);
            // Don't show error toast - just silently fail
            setBookedSlots([]);
        }
    };

    const generateAvailableTimes = () => {
        if (!selectedDate || !availability || !availability.schedule) {
            setAvailableTimes([]);
            return;
        }

        // Get day of week from selected date
        const date = new Date(selectedDate);
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayOfWeek = dayNames[date.getDay()];

        // Get schedule for this day
        const daySchedule = availability.schedule[dayOfWeek];
        if (!daySchedule || daySchedule.length === 0) {
            setAvailableTimes([]);
            return;
        }

        // Get user's timezone
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const mentorTimezone = availability.timezone;

        const times = [];

        // Helper function to check if a time slot overlaps with any booked slot
        const isTimeSlotBooked = (slotStart) => {
            const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000); // 1 hour duration

            return bookedSlots.some(booked => {
                const bookedStart = new Date(booked.sessionDate);
                const bookedEnd = new Date(bookedStart.getTime() + booked.durationMinutes * 60 * 1000);

                // Check if slots overlap
                return (
                    (slotStart >= bookedStart && slotStart < bookedEnd) || // Slot starts during booked time
                    (slotEnd > bookedStart && slotEnd <= bookedEnd) || // Slot ends during booked time
                    (slotStart <= bookedStart && slotEnd >= bookedEnd) // Slot encompasses booked time
                );
            });
        };

        // For each time slot in the day's schedule
        daySchedule.forEach(slot => {
            const [startHour, startMinute] = slot.start.split(':').map(Number);
            const [endHour, endMinute] = slot.end.split(':').map(Number);

            // Create date objects in mentor's timezone
            const startTime = new Date(selectedDate + 'T' + slot.start + ':00');
            const endTime = new Date(selectedDate + 'T' + slot.end + ':00');

            // Generate 1-hour intervals
            let currentTime = new Date(startTime);
            while (currentTime < endTime) {
                // Check if this time slot is already booked
                if (!isTimeSlotBooked(currentTime)) {
                    // Format time for display in user's timezone
                    const displayTime = currentTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: userTimezone
                    });

                    times.push({
                        display: displayTime,
                        value: currentTime.toISOString()
                    });
                }

                // Add 1 hour
                currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
            }
        });

        setAvailableTimes(times);
    };

    const handleBookSession = () => {
        if (!selectedService) {
            toast.error('Please select a service');
            return;
        }
        if (!selectedDate || !selectedTime) {
            toast.error('Please select a date and time');
            return;
        }
        setShowBookingModal(true);
    };

    const confirmBooking = async () => {
        setBookingLoading(true);
        try {
            const bookingData = {
                mentorId: mentorId,
                serviceId: selectedService.id,
                sessionDate: selectedTime, // Already in ISO format (UTC)
                sessionTopic: selectedService.mentorshipService,
                notes: null
            };

            const response = await axios.post('/api/bookings', bookingData, {
                withCredentials: true // Include auth cookie
            });

            if (response.data.success) {
                toast.success('Booking created successfully! The mentor will confirm shortly.');
                setShowBookingModal(false);
                // Reset selections
                setSelectedDate('');
                setSelectedTime('');
                setAvailableTimes([]);
                // Clear sessionStorage booking data
                sessionStorage.removeItem('redirectToMentor');
                sessionStorage.removeItem('bookingDate');
                sessionStorage.removeItem('bookingTime');
                // Update booking status to show the "already booked" message
                setHasExistingBooking(true);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to create booking. Please try again.');
            }
        } finally {
            setBookingLoading(false);
        }
    };

    // Generate next 14 days for date selection
    const getNextDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const formatDate = (date) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            dayName: dayNames[date.getDay()],
            day: date.getDate(),
            month: monthNames[date.getMonth()],
            fullDate: date.toISOString().split('T')[0]
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!mentor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Mentor not found</h2>
                    <Link to="/mentors" className="text-blue-600 hover:text-blue-700">
                        Back to Mentors
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-8 pt-8 pb-4">
                <button
                    onClick={() => navigate('/mentors')}
                    className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Mentors</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 pb-16">
                {/* Show message if user already has booking */}
                {user && hasExistingBooking && (
                    <div className="mb-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                    You already have a booking with this mentor!
                                </h3>
                                <p className="text-sm text-blue-800">
                                    Hey! You already have a booking with this mentor. For details, please check your{' '}
                                    <Link to="/student-dashboard" className="font-semibold underline hover:text-blue-900">
                                        dashboard
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="col-span-2 space-y-8">
                        {/* Profile Header */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                            <div className="flex gap-6 mb-6">
                                {/* Mentor Photo */}
                                <div className="flex-shrink-0">
                                    {mentor.photoUrl ? (
                                        <img
                                            src={mentor.photoUrl}
                                            alt={`${mentor.firstName} ${mentor.lastName}`}
                                            className="w-48 h-64 object-cover rounded-xl"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=FA8AFF&color=fff&size=400`;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-48 h-64 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl font-bold">
                                            {mentor.firstName?.[0]}{mentor.lastName?.[0]}
                                        </div>
                                    )}
                                </div>

                                {/* Mentor Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <h1 className="text-4xl font-bold ">
                                                    {mentor.firstName} {mentor.lastName}
                                                </h1>
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex items-center gap-1 bg-secondary text-white px-4 py-2 rounded-full">
                                                    <Star className="fill-white text-white" size={18} />
                                                    <span className="text-lg font-semibold">5.0</span>
                                                </div>
                                                <span className="text-gray-600">(0 reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Briefcase size={18} className="text-gray-400" />
                                            <span className="text-lg">
                                                {mentor.currentPosition || 'Mentor'}
                                                {mentor.company && ` • ${mentor.company}`}
                                            </span>
                                        </div>

                                        {mentor.occupationArea && (
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <MessageCircle size={18} className="text-gray-400" />
                                                <span className="text-lg">{mentor.occupationArea}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Clock size={18} className="text-gray-400" />
                                            <span className="text-lg">Responds within 24 hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {mentor.occupationArea && (
                                    <span className="px-4 py-2 bg-primary/10  rounded-lg text-sm border border-primary/20">
                                        {mentor.occupationArea}
                                    </span>
                                )}
                                {mentor.university && (
                                    <span className="px-4 py-2 bg-primary/10  rounded-lg text-sm border border-primary/20">
                                        {mentor.university}
                                    </span>
                                )}
                                {mentor.faculty && (
                                    <span className="px-4 py-2 bg-primary/10  rounded-lg text-sm border border-primary/20">
                                        {mentor.faculty}
                                    </span>
                                )}
                                {mentor.yearsOfExperience && (
                                    <span className="px-4 py-2 bg-primary/10  rounded-lg text-sm border border-primary/20">
                                        {mentor.yearsOfExperience} years experience
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                            <h2 className="text-2xl font-bold  mb-4">About Me</h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {mentor.bio || 'I am passionate about helping students achieve their academic and career goals. With my experience and expertise, I provide personalized guidance to help you navigate your educational journey and make informed decisions about your future.'}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                            <h2 className="text-2xl font-bold  mb-6">Reviews</h2>
                            <div className="text-center py-8 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <p>No reviews yet. Be the first to book a session!</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 sticky top-8">
                            <h3 className="text-2xl font-bold  mb-6">Book a Session</h3>

                            {/* Availability Info */}
                            {availability && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3 mb-3">
                                        <Calendar size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Availability</p>
                                            <p className="text-gray-900">Check calendar below</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Response Time</p>
                                            <p className="text-gray-900">Within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Service Selection */}
                            {services.length > 0 ? (
                                <div className="space-y-4 mb-6">
                                    <p className="text-sm text-gray-600 font-medium">Select session type:</p>
                                    {services.map((service) => (
                                        <div
                                            key={service.id}
                                            className={`border-2 rounded-lg p-4 hover:border-secondary transition-colors cursor-pointer ${selectedService?.id === service.id ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                                                }`}
                                            onClick={() => setSelectedService(service)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-gray-900 font-semibold">{service.mentorshipService}</h4>
                                                <span className="text-xl font-bold ">₾{service.totalPrice}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{service.durationMinutes} minutes</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                                    <p>This mentor has not set up services yet</p>
                                </div>
                            )}

                            {/* Date Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Select Date:</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Time Slots */}
                            {selectedDate && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Time:</label>
                                    {availableTimes.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableTimes.map((time, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedTime(time.value)}
                                                    className={`px-3 py-2 text-sm rounded-lg transition ${selectedTime === time.value
                                                            ? 'bg-secondary text-white'
                                                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {time.display}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
                                            No available times for this date
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Book Button */}
                            <button
                                onClick={handleBookSession}
                                disabled={!selectedDate || !selectedTime || !selectedService}
                                className="w-full px-6 py-4 bg-secondary text-white rounded-full hover:opacity-90 transition-opacity text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Book Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold ">Confirm Booking</h3>
                            <button
                                className="text-gray-600 hover:text-secondary transition-colors"
                                onClick={() => setShowBookingModal(false)}
                                disabled={bookingLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {!user ? (
                            /* Not Authenticated */
                            <div className="text-center">
                                <h3 className="text-2xl font-bold  mb-3">Hi!</h3>
                                <p className="text-lg text-gray-600 mb-6">
                                    Please register to book the session
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowBookingModal(false)}
                                        className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <Link
                                        to="/auth/register"
                                        onClick={() => {
                                            // Save booking details to sessionStorage to redirect back after registration
                                            sessionStorage.setItem('redirectToMentor', mentorId);
                                            sessionStorage.setItem('bookingDate', selectedDate);
                                            sessionStorage.setItem('bookingTime', selectedTime);
                                        }}
                                        className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition font-medium text-center"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* Authenticated */
                            <>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="text-secondary" size={32} />
                                    </div>
                                    <p className="text-lg text-gray-700">
                                        You're scheduling a session with{' '}
                                        <span className="font-bold ">{mentor.firstName} {mentor.lastName}</span>
                                        {' '}on{' '}
                                        <span className="font-bold">
                                            {new Date(selectedDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}{' '}
                                            at {selectedTime && new Date(selectedTime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowBookingModal(false)}
                                        disabled={bookingLoading}
                                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmBooking}
                                        disabled={bookingLoading}
                                        className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {bookingLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Confirm'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorProfile;
