// src/pages/MentorProfile.jsx

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthProvider';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
            const response = await axios.get(`/api/mentors/${mentorId}`);

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
            const response = await axios.get(`/api/mentors/${mentorId}/services`);

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
            const response = await axios.get(`/api/mentors/${mentorId}/availability`);

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
            const response = await axios.get(`/api/bookings/booked-times/${mentorId}`, {
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

            <div className="container mx-auto px-4 py-8">
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

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Mentor Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Photo */}
                                <div className="flex-shrink-0">
                                    {mentor.photoUrl ? (
                                        <img
                                            src={mentor.photoUrl}
                                            alt={`${mentor.firstName} ${mentor.lastName}`}
                                            className="w-32 h-32 md:w-48 md:h-48 rounded-xl object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=3b82f6&color=fff&size=200`;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="flex-1">
                                    <div className="mb-4">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {mentor.firstName} {mentor.lastName}
                                        </h1>
                                        <span className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full">
                                            {mentor.currentPosition || 'Mentor'}
                                        </span>
                                    </div>

                                    {/* Occupation Area */}
                                    {mentor.occupationArea && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-700 font-medium">{mentor.occupationArea}</span>
                                        </div>
                                    )}

                                    {/* University & Faculty */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                        <span className="text-gray-700 font-medium">{mentor.university || 'Independent'}</span>
                                        {mentor.faculty && (
                                            <span className="text-gray-500">• {mentor.faculty}</span>
                                        )}
                                    </div>

                                    {/* Company */}
                                    {mentor.company && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-gray-600 text-sm">Company:</span>
                                            <span className="text-gray-700 font-medium">{mentor.company}</span>
                                        </div>
                                    )}

                                    {/* Years of Experience */}
                                    {mentor.yearsOfExperience && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            <span className="text-gray-600 text-sm">Experience:</span>
                                            <span className="text-gray-700 font-medium">{mentor.yearsOfExperience} years</span>
                                        </div>
                                    )}

                                    {/* Contact */}
                                    <div className="flex items-center gap-4 mt-4">
                                        {mentor.linkedin && (
                                            <a
                                                href={mentor.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                                <span className="text-sm">LinkedIn</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {mentor.bio || 'I am passionate about helping students achieve their academic and career goals. With my experience and expertise, I provide personalized guidance to help you navigate your educational journey and make informed decisions about your future.'}
                            </p>
                        </div>


                        {/* Reviews Section (Placeholder) */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                            <div className="text-center py-8 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <p>No reviews yet. Be the first to book a session!</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Book a Session</h2>

                            {/* Calendar */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Time Slots */}
                            {selectedDate && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                                    {availableTimes.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableTimes.map((time, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedTime(time.value)}
                                                    className={`px-3 py-2 text-sm rounded-lg transition ${selectedTime === time.value
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

                            {/* Service Selection */}
                            {services.length > 0 ? (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Service</label>
                                    <div className="space-y-3">
                                        {services.map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelectedService(service)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition ${selectedService?.id === service.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{service.mentorshipService}</h4>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <span className="text-lg font-bold text-blue-600">₾{service.totalPrice}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                                    <p>This mentor has not set up services yet</p>
                                </div>
                            )}

                            {/* Book Button */}
                            <div className="relative group">
                                <button
                                    onClick={handleBookSession}
                                    disabled={!selectedDate || !selectedTime || !selectedService}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                                >
                                    Book Session
                                </button>
                                {(!selectedDate || !selectedTime || !selectedService) && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        Please select date and time
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                            <div className="border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showBookingModal && (
                <>
                    {/* Backdrop to freeze background */}
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                            {!user ? (
                                /* Not Authenticated */
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-3">Hi!</h3>
                                    <p className="text-lg text-blue-100 mb-6">
                                        Please register to book the session
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowBookingModal(false)}
                                            className="flex-1 px-6 py-3 text-blue-700 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition font-medium"
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
                                            className="flex-1 px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium text-center"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                /* Authenticated */
                                <>
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-lg text-white">
                                            You're scheduling the session with{' '}
                                            <span className="font-bold">{mentor.firstName} {mentor.lastName}</span>{' '}
                                            at{' '}
                                            <span className="font-bold">
                                                {new Date(selectedDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}{' '}
                                                {selectedTime && new Date(selectedTime).toLocaleTimeString('en-US', {
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
                                            className="flex-1 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmBooking}
                                            disabled={bookingLoading}
                                            className="flex-1 px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {bookingLoading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Proceed'
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MentorProfile;