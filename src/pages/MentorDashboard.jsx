// src/pages/MentorDashboard.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import ProfileSettings from '../components/mentor/ProfileSettings';
import TimezoneServices from '../components/mentor/TimezoneServices';
import toast from 'react-hot-toast';
import { User, Clock, HelpCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    // baseURL: API_BASE_URL,
    baseURL: `${API_BASE_URL}/api/dashboard`,
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
                    განხილვაში
                </span>
            );
        } else if (profile.applicationStatus === 'approved') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    დამტკიცებული
                </span>
            );
        } else if (profile.applicationStatus === 'rejected') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    უარყოფილი
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
            label: 'პროფილის პარამეტრები',
            icon: <User size={20} />
        },
        {
            id: 'availability',
            label: 'დროის ზონა და სერვისები',
            icon: <Clock size={20} />
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">იტვირთება...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
                    {/* Profile Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col items-center text-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                                {profile && getInitials(profile.firstName, profile.lastName)}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">
                                {profile?.firstName} {profile?.lastName}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">მენტორი</p>
                            {getApplicationStatusBadge()}
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activeSection === item.id
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <span className={activeSection === item.id ? 'text-white' : 'text-gray-500'}>
                                            {item.icon}
                                        </span>
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Quick Stats */}
                    <div className="p-6 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">სტატისტიკა</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">წევრობა დაიწყო</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {profile?.memberSince ? new Date(profile.memberSince).toLocaleDateString('ka-GE') : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="p-6 border-t border-gray-200">
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <HelpCircle size={20} className="" />
                                დახმარება
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                                იხილეთ დოკუმენტაცია ან დაუკავშირდით მხარდაჭერას
                            </p>
                            <a
                                href="/support"
                                className="text-sm  font-medium hover:text-secondary transition-colors"
                            >
                                დახმარების ცენტრი →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="p-8">
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
