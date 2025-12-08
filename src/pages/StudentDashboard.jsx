// src/pages/StudentDashboard.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: '/api/dashboard',
    withCredentials: true,
});

const StudentDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [openSessions, setOpenSessions] = useState({});
    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        fetchProfile();
        // TODO: Fetch sessions when endpoint is ready
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/student/profile');

            if (response.data.success) {
                setProfile(response.data.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    // Filter sessions by status
    const confirmedSessions = upcomingSessions.filter(
        (session) => session.status === "confirmed"
    );
    const pendingSessions = upcomingSessions.filter(
        (session) => session.status === "pending"
    );
    const completedSessions = upcomingSessions.filter(
        (session) => session.status === "completed"
    );
    const cancelledSessions = upcomingSessions.filter(
        (session) => session.status === "cancelled"
    );

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const menuItems = [
        {
            id: 'profile',
            label: 'Profile Settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            description: 'Manage your personal information'
        },
        {
            id: 'sessions',
            label: 'My Sessions',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            description: 'View all your sessions'
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const SessionCard = ({ session, isConfirmed = false }) => {
        const isOpen = openSessions[session.id] || false;

        return (
            <div className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${isConfirmed ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200' : 'bg-white border border-gray-200'
                }`}>
                <div
                    onClick={() => setOpenSessions(prev => ({ ...prev, [session.id]: !prev[session.id] }))}
                    className={`p-6 cursor-pointer transition-all ${isConfirmed
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white hover:bg-gray-50'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isConfirmed ? 'bg-white/20' : 'bg-gray-100'
                                }`}>
                                {isConfirmed ? (
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                ) : session.status === 'pending' ? (
                                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                ) : (
                                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${isConfirmed ? 'text-white' : 'text-gray-900'}`}>
                                    Session on {session.bookingDate}
                                </h3>
                                <p className={`text-sm ${isConfirmed ? 'text-white/90' : 'text-gray-600'}`}>
                                    {session.startTime}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isConfirmed
                                ? 'bg-white text-blue-600'
                                : session.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : session.status === 'completed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                {session.status.toUpperCase()}
                            </span>
                            <svg
                                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${isConfirmed ? 'text-white' : 'text-gray-500'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="p-6 bg-white space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-gray-50">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                    Mentor
                                </span>
                                <p className="font-semibold text-gray-900">
                                    {session.mentor?.firstName} {session.mentor?.lastName}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-gray-50">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                    Date & Time
                                </span>
                                <p className="font-semibold text-gray-900">
                                    {session.bookingDate} at {session.startTime}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-gray-50">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                    Duration
                                </span>
                                <p className="font-semibold text-gray-900">60 minutes</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gray-50">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                    Service Type
                                </span>
                                <p className="font-semibold text-gray-900">{session.serviceType || 'Career Guidance'}</p>
                            </div>
                        </div>

                        {session.status === "confirmed" && (
                            <>
                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                    <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold block mb-2">
                                        Meeting Link
                                    </span>
                                    <p className="font-medium text-gray-900">
                                        {session.meetingLink || "Meeting link will be available 10 minutes before session."}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        to={`/mentor/${session.mentorId}`}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                                    >
                                        View Mentor Profile
                                    </Link>
                                    <a
                                        href="https://z-academy.atlassian.net/servicedesk/customer/portal/1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-200 transition"
                                    >
                                        Contact Support
                                    </a>
                                </div>
                            </>
                        )}

                        {session.status === "pending" && (
                            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                <p className="text-sm text-yellow-800">
                                    This session is pending confirmation from the mentor.
                                </p>
                            </div>
                        )}

                        {session.status === "completed" && (
                            <div className="flex gap-3">
                                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Leave Review
                                </button>
                                <Link
                                    to={`/mentor/${session.mentorId}`}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-200 transition"
                                >
                                    Book Again
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const DashboardContent = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 sticky top-8">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
                            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                {profile && getInitials(profile.firstName, profile.lastName)}
                            </div>
                        </div>
                    </div>

                    {/* Name and Status */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {profile?.firstName} {profile?.lastName}
                        </h2>

                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <div className="bg-white/60 rounded-lg p-4">
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                Email
                            </span>
                            <p className="text-sm font-medium text-gray-900 break-all">
                                {profile?.email}
                            </p>
                        </div>
                        <div className="bg-white/60 rounded-lg p-4">
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                                Phone
                            </span>
                            <p className="text-sm font-medium text-gray-900">
                                {profile?.countryCode} {profile?.phone}
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{confirmedSessions.length}</div>
                            <div className="text-xs text-gray-600">Upcoming</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{completedSessions.length}</div>
                            <div className="text-xs text-gray-600">Completed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Sessions */}
            <div className="lg:col-span-2 space-y-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Sessions</h2>
                    <p className="text-gray-600">Your confirmed mentorship sessions</p>
                </div>

                {/* Confirmed Sessions */}
                <div className="space-y-4">
                    {confirmedSessions.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-2">No confirmed upcoming sessions</p>
                            <p className="text-sm text-gray-500 mb-6">Book a session with a mentor to get started</p>
                            <Link
                                to="/mentors"
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                            >
                                Browse Mentors
                            </Link>
                        </div>
                    ) : (
                        confirmedSessions.map(session => (
                            <SessionCard key={session.id} session={session} isConfirmed={true} />
                        ))
                    )}
                </div>

                {/* Other Sessions */}
                {(pendingSessions.length > 0 || completedSessions.length > 0 || cancelledSessions.length > 0) && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Other Sessions</h3>
                        <div className="space-y-4">
                            {[...pendingSessions, ...completedSessions, ...cancelledSessions].map(session => (
                                <SessionCard key={session.id} session={session} isConfirmed={false} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const ProfileContent = () => {
        const [isEditing, setIsEditing] = useState(false);
        const [saving, setSaving] = useState(false);
        const [formData, setFormData] = useState({
            firstName: profile?.firstName || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            countryCode: profile?.countryCode || '+995',
            dateOfBirth: profile?.dateOfBirth || ''
        });

        useEffect(() => {
            if (profile) {
                setFormData({
                    firstName: profile.firstName || '',
                    lastName: profile.lastName || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    countryCode: profile.countryCode || '+995',
                    dateOfBirth: profile.dateOfBirth || ''
                });
            }
        }, [profile]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const hasChanges = () => {
            if (!profile) return false;
            return (
                formData.firstName !== (profile.firstName || '') ||
                formData.lastName !== (profile.lastName || '') ||
                formData.email !== (profile.email || '') ||
                formData.phone !== (profile.phone || '') ||
                formData.countryCode !== (profile.countryCode || '+995') ||
                formData.dateOfBirth !== (profile.dateOfBirth || '')
            );
        };

        const validateForm = () => {
            if (!formData.firstName?.trim()) {
                toast.error('First name is required');
                return false;
            }
            if (!formData.lastName?.trim()) {
                toast.error('Last name is required');
                return false;
            }
            if (!formData.email?.trim()) {
                toast.error('Email is required');
                return false;
            }
            if (!formData.phone?.trim()) {
                toast.error('Phone number is required');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                toast.error('Please enter a valid email address');
                return false;
            }

            return true;
        };

        const handleSave = async () => {
            if (!validateForm()) return;

            setSaving(true);
            try {
                const response = await api.put('/student/profile', formData);

                if (response.data.success) {
                    toast.success('Profile updated successfully');
                    await fetchProfile();
                    setIsEditing(false);
                }
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to update profile');
            } finally {
                setSaving(false);
            }
        };

        const handleCancel = () => {
            if (hasChanges()) {
                const confirmCancel = window.confirm(
                    'You have unsaved changes. Are you sure you want to cancel?'
                );
                if (!confirmCancel) return;
            }

            setFormData({
                firstName: profile?.firstName || '',
                lastName: profile?.lastName || '',
                email: profile?.email || '',
                phone: profile?.phone || '',
                countryCode: profile?.countryCode || '+995',
                dateOfBirth: profile?.dateOfBirth || ''
            });
            setIsEditing(false);
        };

        return (
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Unsaved Changes Warning */}
                {isEditing && hasChanges() && (
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-orange-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-orange-800">You have unsaved changes</p>
                                <p className="text-xs text-orange-700 mt-1">Remember to save your changes before leaving this page</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving || !hasChanges()}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {hasChanges() && !saving && (
                                    <span className="text-xs text-gray-500">
                                        Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl+S</kbd> to save
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-24 px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                >
                                    <option value="+995">+995</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+49">+49</option>
                                    <option value="+33">+33</option>
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const SessionsContent = () => (
        <div className="space-y-6">
            {/* Support Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 className="text-sm font-semibold text-blue-900 mb-1">Need Session Support?</h3>
                        <p className="text-sm text-blue-800 mb-2">
                            For assistance with scheduling, cancellations, or if a mentor does not attend your session, please contact our customer support portal.
                        </p>
                        <a
                            href="https://z-academy.atlassian.net/servicedesk/customer/portal/1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Contact Support
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Sessions</h2>

                {/* Tabs */}
                <div className="border-b mb-6">
                    <nav className="flex space-x-8">
                        {[
                            { name: 'Confirmed', count: confirmedSessions.length, color: 'blue' },
                            { name: 'Pending', count: pendingSessions.length, color: 'yellow' },
                            { name: 'Completed', count: completedSessions.length, color: 'green' },
                            { name: 'Cancelled', count: cancelledSessions.length, color: 'gray' }
                        ].map((tab) => (
                            <button
                                key={tab.name}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm ${tab.color === 'blue'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.name}
                                <span className="ml-2 py-0.5 px-2.5 rounded-full bg-gray-100 text-xs">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Sessions List */}
                <div className="space-y-4">
                    {upcomingSessions.map(session => (
                        <SessionCard key={session.id} session={session} isConfirmed={session.status === 'confirmed'} />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-80 bg-white shadow-xl h-screen sticky top-0 overflow-y-auto">
                    {/* Profile Header */}
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {profile && getInitials(profile.firstName, profile.lastName)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">
                                    {profile?.firstName} {profile?.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">Student Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    {item.id === 'bookings' ? (
                                        <Link
                                            to="/mentors"
                                            className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50 text-gray-700 flex items-center gap-3"
                                        >
                                            <span className="text-gray-500">{item.icon}</span>
                                            <div>
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 text-blue-700'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={activeSection === item.id ? 'text-blue-600' : 'text-gray-500'}>
                                                    {item.icon}
                                                </span>
                                                <div>
                                                    <div className="font-medium">{item.label}</div>
                                                    <div className="text-xs text-gray-500">{item.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Help Section */}
                    <div className="p-6 border-t">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Need Help?
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                                Check our documentation or contact support
                            </p>
                            <a
                                href="https://z-academy.atlassian.net/servicedesk/customer/portal/1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 font-medium hover:text-blue-700"
                            >
                                View Help Center →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="p-8">
                        {/* Dynamic Content */}
                        {activeSection === 'profile' && <ProfileContent />}
                        {activeSection === 'sessions' && <SessionsContent />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;