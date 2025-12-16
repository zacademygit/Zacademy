// src/pages/StudentDashboard.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Calendar, BookOpen, Clock, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';


const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/dashboard`,
    withCredentials: true,
});

const StudentDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [pastSessions, setPastSessions] = useState([]);

    // UI State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedSessionForReschedule, setSelectedSessionForReschedule] = useState(null);
    const [selectedSessionForCancel, setSelectedSessionForCancel] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

    // Mock data for mentor time slots
    const mentorTimeSlots = {};

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
                setEditedUser(response.data.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    // UI Helper Functions
    const handleSaveProfile = async () => {
        try {
            const response = await api.put('/student/profile', editedUser);
            if (response.data.success) {
                setProfile(editedUser);
                setIsEditingProfile(false);
                toast.success('Profile updated successfully');
                await fetchProfile();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleReschedule = (session) => {
        setSelectedSessionForReschedule(session);
        setShowRescheduleModal(true);
    };

    const handleCancel = (session) => {
        setSelectedSessionForCancel(session);
        setShowCancelModal(true);
    };

    const handleConfirmReschedule = () => {
        toast.success('Session rescheduled successfully');
        setShowRescheduleModal(false);
        setSelectedSessionForReschedule(null);
    };

    const handleConfirmCancel = () => {
        toast.success('Session cancelled successfully');
        setShowCancelModal(false);
        setSelectedSessionForCancel(null);
    };

    const goToPreviousMonth = () => {
        if (currentMonthOffset > 0) {
            setCurrentMonthOffset(currentMonthOffset - 1);
        }
    };

    const goToNextMonth = () => {
        if (currentMonthOffset < 5) {
            setCurrentMonthOffset(currentMonthOffset + 1);
        }
    };

    const getCurrentMonthName = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + currentMonthOffset);
        return date.toLocaleDateString('ka-GE', { month: 'long', year: 'numeric' });
    };

    const getDaysForMonth = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + currentMonthOffset);
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const formatDate = (date) => {
        return {
            fullDate: date.toISOString().split('T')[0],
            day: date.getDate(),
            month: date.toLocaleDateString('ka-GE', { month: 'short' }),
            dayName: date.toLocaleDateString('ka-GE', { weekday: 'short' })
        };
    };

    // Computed values from profile
    const userData = profile ? {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        memberSince: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('ka-GE') : '',
        completedSessions: 0,
        upcomingSessions: upcomingSessions.length,
        totalSpent: 0
    } : null;

    if (loading || !userData) {
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
            <div className="max-w-[1440px] mx-auto bg-white">

                {/* Main Content */}
                <div className="px-8 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-3 gap-8">
                            {/* Left Column - Profile & Stats */}
                            <div className="col-span-1 space-y-6">
                                {/* Profile Card */}
                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                                    <div className="flex items-center gap-2 mb-6">
                                        <User className="" size={24} />
                                        <h2 className="text-2xl ">ჩემი პროფილი</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-left text-gray-600 mb-1">სრული სახელი</p>
                                            <p className="text-left text-gray-900">{isEditingProfile ? <input type="text" value={editedUser.firstName} onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })} className="border-2 border-gray-300 p-1 rounded" /> : userData.firstName} {isEditingProfile ? <input type="text" value={editedUser.lastName} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} className="border-2 border-gray-300 p-1 rounded" /> : userData.lastName}</p>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Mail size={18} className="text-gray-400" />
                                            <p className="text-sm">{isEditingProfile ? <input type="email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} className="border-2 border-gray-300 p-1 rounded" /> : userData.email}</p>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Phone size={18} className="text-gray-400" />
                                            <p className="text-sm">{isEditingProfile ? <input type="tel" value={editedUser.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} className="border-2 border-gray-300 p-1 rounded" /> : userData.phone}</p>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Calendar size={18} className="text-gray-400" />
                                            <p className="text-sm text-left">დაბადების თარიღი: {userData.dateOfBirth}</p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 mb-1">წევრობის თარიღი</p>
                                            <p className="text-gray-900">{userData.memberSince}</p>
                                        </div>

                                        {isEditingProfile ? (
                                            <button className="w-full py-3 px-4 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity" onClick={handleSaveProfile}>
                                                პროფილის შენახვა
                                            </button>
                                        ) : (
                                            <button className="w-full py-3 px-4 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity" onClick={() => setIsEditingProfile(true)}>
                                                პროფილის რედაქტირება
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Stats Card */}
                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                                    <h3 className="text-xl  mb-6">სტატისტიკა</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">დასრულებული სესიები</span>
                                            <span className="text-2xl ">{userData.completedSessions}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">მოსალოდნელი სესიები</span>
                                            <span className="text-2xl text-secondary">{userData.upcomingSessions}</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                            <span className="text-gray-600">სულ დახარჯული</span>
                                            <span className="text-2xl ">€{userData.totalSpent}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Sessions */}
                            <div className="col-span-2 space-y-6">
                                {/* Upcoming Sessions */}
                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Calendar className="text-secondary" size={24} />
                                        <h2 className="text-2xl ">მოსალოდნელი სესიები</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {upcomingSessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="border-2 border-gray-200 rounded-xl p-5 hover:border-secondary transition-colors"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Mentor Photo */}
                                                    <img
                                                        src={session.mentor.image}
                                                        alt={session.mentor.name}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />

                                                    {/* Session Details */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h4 className="text-lg text-gray-900 mb-1">{session.mentor.name}</h4>
                                                                <p className="text-sm text-gray-600">{session.mentor.title}</p>
                                                                <p className="text-sm text-gray-500">{session.mentor.company}</p>
                                                            </div>
                                                            <div className={`px-3 py-1 rounded-full text-sm ${session.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {session.status === 'confirmed' ? 'დადასტურებული' : 'მოლოდინში'}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <BookOpen size={16} className="text-gray-400" />
                                                                <span>{session.sessionType}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar size={16} className="text-gray-400" />
                                                                <span>{session.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock size={16} className="text-gray-400" />
                                                                <span>{session.time} ({session.duration})</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xl ">€{session.price}</span>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                                                    onClick={() => handleReschedule(session)}
                                                                >
                                                                    გადატანა
                                                                </button>
                                                                <button
                                                                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                                                    onClick={() => handleCancel(session)}
                                                                >
                                                                    გაუქმება
                                                                </button>
                                                                <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity text-sm">
                                                                    დეტალები
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {upcomingSessions.length === 0 && (
                                        <div className="text-center py-12">
                                            <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
                                            <p className="text-gray-500">ჯერ არ გაქვს დაგეგმილი სესიები</p>
                                            <Link to="/mentors">
                                                <button className="mt-4 px-6 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity">
                                                    მენტორის ძებნა
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Past Sessions */}
                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Star className="" size={24} />
                                        <h2 className="text-2xl ">გასული სესიები</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {pastSessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="border-2 border-gray-200 rounded-xl p-5"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Mentor Photo */}
                                                    <img
                                                        src={session.mentor.image}
                                                        alt={session.mentor.name}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />

                                                    {/* Session Details */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <h4 className="text-gray-900 mb-1">{session.mentor.name}</h4>
                                                                <p className="text-sm text-gray-600">{session.mentor.title}</p>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={star <= session.rating ? 'fill-secondary text-secondary' : 'text-gray-300'}
                                                                        size={16}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <BookOpen size={14} className="text-gray-400" />
                                                                <span>{session.sessionType}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                <span>{session.date}</span>
                                                            </div>
                                                        </div>

                                                        {session.review && (
                                                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                                "{session.review}"
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Reschedule Modal */}
            {showRescheduleModal && selectedSessionForReschedule && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[500px]">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl ">სესიის გადატანა</h3>
                            <button
                                className="text-gray-600 hover:text-secondary transition-colors"
                                onClick={() => setShowRescheduleModal(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Mentor Info */}
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200">
                            <img
                                src={selectedSessionForReschedule.mentor.image}
                                alt={selectedSessionForReschedule.mentor.name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <h4 className="text-gray-900">{selectedSessionForReschedule.mentor.name}</h4>
                                <p className="text-sm text-gray-600">{selectedSessionForReschedule.sessionType}</p>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-600 mb-2">აირჩიეთ ახალი თარიღი:</label>

                            {/* Month Display with Navigation Arrows */}
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <button
                                    className="text-gray-600 hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    onClick={goToPreviousMonth}
                                    disabled={currentMonthOffset === 0}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <h4 className="text-lg ">{getCurrentMonthName()}</h4>
                                <button
                                    className="text-gray-600 hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    onClick={goToNextMonth}
                                    disabled={currentMonthOffset >= 5}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {getDaysForMonth().map((date) => (
                                    <button
                                        key={date.toISOString()}
                                        className={`px-2 py-2 rounded-lg text-sm ${selectedDate === formatDate(date).fullDate ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                                        onClick={() => setSelectedDate(formatDate(date).fullDate)}
                                    >
                                        <div className={`text-xs ${selectedDate === formatDate(date).fullDate ? 'text-white/80' : 'text-gray-500'}`}>{formatDate(date).dayName}</div>
                                        <div className="text-base">{formatDate(date).day}</div>
                                        <div className={`text-xs ${selectedDate === formatDate(date).fullDate ? 'text-white/80' : 'text-gray-500'}`}>{formatDate(date).month}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-600 mb-2">აირჩიეთ ახალი დრო:</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(mentorTimeSlots[selectedSessionForReschedule.mentor.name] || ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30']).map((time) => (
                                    <button
                                        key={time}
                                        className={`px-3 py-2 rounded-lg text-sm ${selectedTime === time ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Confirm Reschedule Button */}
                        <button
                            className="w-full px-6 py-3 bg-secondary text-white rounded-full hover:opacity-90 transition-opacity"
                            onClick={handleConfirmReschedule}
                        >
                            გადატანის დადასტურება
                        </button>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && selectedSessionForCancel && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[500px]">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl ">სესიის გაუქმება</h3>
                            <button
                                className="text-gray-600 hover:text-secondary transition-colors"
                                onClick={() => setShowCancelModal(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Mentor Info */}
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200">
                            <img
                                src={selectedSessionForCancel.mentor.image}
                                alt={selectedSessionForCancel.mentor.name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <h4 className="text-gray-900">{selectedSessionForCancel.mentor.name}</h4>
                                <p className="text-sm text-gray-600">{selectedSessionForCancel.sessionType}</p>
                            </div>
                        </div>

                        {/* Session Details */}
                        <div className="mb-5 bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-gray-700">{selectedSessionForCancel.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span className="text-gray-700">{selectedSessionForCancel.time} ({selectedSessionForCancel.duration})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl ">€{selectedSessionForCancel.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Warning Message */}
                        <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-700">
                                ⚠️ გთხოვთ გაითვალისწინოთ, რომ სესიის გაუქმების შემთხვევაში თქვენ შეიძლება დაგიბრუნდეთ თანხის მხოლოდ ნაწილი ან საერთოდ არ დაგიბრუნდეთ, პატფორმის წესების შესაბამისად.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                onClick={() => setShowCancelModal(false)}
                            >
                                უკან დაბრუნება
                            </button>
                            <button
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                onClick={handleConfirmCancel}
                            >
                                სესიის გაუქმება
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
