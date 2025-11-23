// src/pages/MentorProfile.jsx

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const MentorProfile = () => {
    const { mentorId } = useParams();
    console.log('mentorid', mentorId)
    const navigate = useNavigate();
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Sample availability times (you can replace with actual availability from backend)
    const availableTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00'
    ];

    // Sample services (you can fetch from backend)
    const services = [
        { id: 1, name: 'Career Guidance', duration: '30 min', price: 'Free' },
        { id: 2, name: 'University Applications', duration: '60 min', price: '$50' },
        { id: 3, name: 'Scholarship Strategy', duration: '45 min', price: '$40' },
        { id: 4, name: 'Interview Preparation', duration: '60 min', price: '$60' },
    ];

    useEffect(() => {
        fetchMentorProfile();
    }, [mentorId]);

    const fetchMentorProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/mentor/${mentorId}`);

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

    const handleBookSession = () => {
        if (!selectedDate || !selectedTime) {
            toast.error('Please select a date and time');
            return;
        }
        setShowBookingModal(true);
    };

    const confirmBooking = () => {
        toast.success('Booking request sent! The mentor will confirm shortly.');
        setShowBookingModal(false);
        // Here you would normally send the booking request to your backend
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

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="text-gray-400">›</span>
                        <Link to="/mentors" className="text-gray-500 hover:text-gray-700">Mentors</Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-700">{mentor.firstName} {mentor.lastName}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
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
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {mentor.firstName} {mentor.lastName}
                                            </h1>
                                            <span className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full">
                                                {mentor.fieldOfStudy || 'General Mentoring'}
                                            </span>
                                        </div>
                                        {mentor.isApproved && (
                                            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">Verified</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* University */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                        <span className="text-gray-700 font-medium">{mentor.university || 'Independent'}</span>
                                    </div>

                                    {/* Languages */}
                                    {mentor.workingLanguages && mentor.workingLanguages.length > 0 && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            <span className="text-gray-600">Languages:</span>
                                            <div className="flex gap-2 flex-wrap">
                                                {mentor.workingLanguages.map((lang, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact */}
                                    <div className="flex items-center gap-4 mt-4">
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">Message</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                            <span className="text-sm">Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {mentor.aboutMe || 'I am passionate about helping students achieve their academic and career goals. With my experience and expertise, I provide personalized guidance to help you navigate your educational journey and make informed decisions about your future.'}
                            </p>
                        </div>

                        {/* Services Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {services.map(service => (
                                    <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                            <span className="text-blue-600 font-bold">{service.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Duration: {service.duration}</p>
                                    </div>
                                ))}
                            </div>
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
                                    <div className="grid grid-cols-3 gap-2">
                                        {availableTimes.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`px-3 py-2 text-sm rounded-lg transition ${selectedTime === time
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Service Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} - {service.duration} ({service.price})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Pricing */}
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Session Price</span>
                                    <span className="font-semibold">$50</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Platform Fee</span>
                                    <span className="font-semibold">$5</span>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold text-blue-600">$55</span>
                                </div>
                            </div>

                            {/* Book Button */}
                            <button
                                onClick={handleBookSession}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                            >
                                Book Session
                            </button>

                            {/* Response Time */}
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Usually responds within 2 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Booking</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mentor:</span>
                                <span className="font-medium">{mentor.firstName} {mentor.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{selectedDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold text-blue-600">$55</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorProfile;