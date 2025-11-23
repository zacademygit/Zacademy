// src/pages/MentorDashboard.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import ProfileSettings from '../components/mentor/ProfileSettings';
import TimezoneServices from '../components/mentor/TimezoneServices';
import toast from 'react-hot-toast';

// const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    // baseURL: API_BASE_URL,
    baseURL: '/api/dashboard',
    withCredentials: true,
});

const MentorDashboard = () => {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/mentor/profile');

            if (response.data.success) {
                setProfile(response.data.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const getApplicationStatusBadge = () => {
        if (!profile) return null;

        if (profile.applicationStatus === 'pending') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Application Pending
                </span>
            );
        } else if (profile.applicationStatus === 'approved') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approved Mentor
                </span>
            );
        } else if (profile.applicationStatus === 'rejected') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Application Rejected
                </span>
            );
        }

        return null;
    };

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
            id: 'availability',
            label: 'Timezone & Services',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            description: 'Set availability and services'
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
                                <p className="text-sm text-gray-600">Mentor Dashboard</p>
                            </div>
                        </div>
                        {getApplicationStatusBadge()}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
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
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Quick Stats */}
                    <div className="p-6 border-t">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Profile Status</span>
                                <span className={`text-sm font-medium ${profile?.profileComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {profile?.profileComplete ? 'Complete' : 'Incomplete'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Member Since</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {profile?.memberSince ? new Date(profile.memberSince).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

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
                            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                                View Help Center →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="p-8">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeSection === 'profile' ? 'Profile Settings' : 'Timezone & Services'}
                            </h1>
                            <p className="text-gray-600">
                                {activeSection === 'profile'
                                    ? 'Update your personal information and mentor profile'
                                    : 'Manage your availability schedule and service offerings'}
                            </p>
                        </div>

                        {/* Dynamic Content */}
                        {activeSection === 'profile' ? (
                            <ProfileSettings profile={profile} refreshProfile={fetchProfile} api={api} />
                        ) : (
                            <TimezoneServices profile={profile} refreshProfile={fetchProfile} api={api} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;