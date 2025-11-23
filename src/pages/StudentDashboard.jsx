// src/pages/StudentDashboard.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

const StudentDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [openSessions, setOpenSessions] = useState({});
    const [activeSection, setActiveSection] = useState('dashboard');
    console.log('rere')
    useEffect(() => {
        if (user?.id) {
            fetchStudentData(user.id);
        }
    }, [user]);

    const fetchStudentData = async (id) => {
        try {
            setLoading(true);
            console.log("Fetching data for student ID:", id);

            // Fetch student profile
            const { data } = await api.get(`/student/${id}`);
            console.log('Fetched student data:', data);

            if (data.success) {
                setProfile({
                    firstName: data.student.firstName,
                    lastName: data.student.lastName,
                    email: data.student.email,
                    phone: data.student.phone,
                    id: data.student.id,
                    countryCode: data.student.countryCode,
                    university: data.student.university,
                    verified: data.student.verified
                });
            }

            // Fetch student's upcoming sessions
            try {
                const sessionResponse = await api.get(`/student/${id}/bookings`);
                console.log('Fetched session data:', sessionResponse.data.sessions);
                const sessions = sessionResponse.data.sessions || [];
                setUpcomingSessions(sessions);

                // Auto-open only confirmed sessions
                const initialOpenState = {};
                sessions.forEach((session) => {
                    initialOpenState[session.id] = session.status === "confirmed";
                });
                setOpenSessions(initialOpenState);
            } catch (sessionError) {
                console.log('No sessions found or error fetching sessions:', sessionError);
                setUpcomingSessions([]);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to load profile";
            toast.error(errorMessage);
            console.error("Error fetching student data:", err);
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
            id: 'dashboard',
            label: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            description: 'View your sessions overview'
        },
        {
            id: 'profile',
            label: 'My Profile',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            description: 'Manage your information'
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
        {
            id: 'bookings',
            label: 'Book a Session',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
            description: 'Find and book mentors'
        }
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
                            {profile?.verified && (
                                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-white">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name and Status */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {profile?.firstName} {profile?.lastName}
                        </h2>
                        {profile?.verified && (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                Verified Student
                            </span>
                        )}
                    </div>

                    {/* University */}
                    {profile?.university && (
                        <div className="text-center pb-4 mb-4 border-b border-gray-200">
                            <p className="text-sm text-gray-600">
                                Student at <span className="font-semibold">{profile.university}</span>
                            </p>
                        </div>
                    )}

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

    const ProfileContent = () => (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            value={profile?.firstName || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            value={profile?.lastName || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={profile?.email || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={profile?.countryCode || ''}
                                disabled
                                className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                            <input
                                type="text"
                                value={profile?.phone || ''}
                                disabled
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                        </div>
                    </div>
                    {profile?.university && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                            <input
                                type="text"
                                value={profile.university}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const SessionsContent = () => (
        <div className="space-y-6">
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
                        {profile?.verified && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Verified Student
                            </span>
                        )}
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

                    {/* Quick Actions */}
                    <div className="p-6 border-t">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                            <Link
                                to="/mentors"
                                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition"
                            >
                                Find a Mentor
                            </Link>
                            <a
                                href="https://z-academy.atlassian.net/servicedesk/customer/portal/1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Get Support
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="p-8">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeSection === 'dashboard' && 'My Dashboard'}
                                {activeSection === 'profile' && 'My Profile'}
                                {activeSection === 'sessions' && 'My Sessions'}
                            </h1>
                            <p className="text-gray-600">
                                {activeSection === 'dashboard' && 'View and manage your upcoming sessions'}
                                {activeSection === 'profile' && 'Manage your personal information'}
                                {activeSection === 'sessions' && 'View all your mentoring sessions'}
                            </p>
                        </div>

                        {/* Dynamic Content */}
                        {activeSection === 'dashboard' && <DashboardContent />}
                        {activeSection === 'profile' && <ProfileContent />}
                        {activeSection === 'sessions' && <SessionsContent />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;