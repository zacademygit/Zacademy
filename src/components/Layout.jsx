// src/components/Layout.jsx

import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from './Footer';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language, switchLanguage } = useLanguage();
    const { user, logout, loading } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Check if we're on a dashboard page
    const isDashboardPage = location.pathname === '/student-dashboard' || location.pathname === '/mentor-dashboard';

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navigateToDashboard = () => {
        if (user?.userType === 'mentor') {
            navigate('/mentor-dashboard');
        } else if (user?.userType === 'user') {
            navigate('/student-dashboard');
        }
        setShowDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown')) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showDropdown]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header/Navigation */}
            <header className="sticky top-0 z-50 w-full bg-neutral-bg">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-secondary">
                                Z-Academy
                            </div>
                        </Link>

                        {/* Desktop Navigation (Hidden on dashboard pages) */}
                        {/* {!isDashboardPage && ( */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/mentors" className="transition-colors">
                                {language === "en" ? "Mentorship" : "მენტორები"}
                            </Link>
                            <Link to="/blogs" className="transition-colors">
                                {language === "en" ? "Blog" : "ბლოგი"}
                            </Link>
                            <Link to="/about" className=" transition-colors">
                                {language === "en" ? "About Us" : "ჩვენს შესახებ"}
                            </Link>
                            {/* {user?.userType !== 'mentor' && (
                                    <Link to="/become-mentor" className="text-light-text hover:text-light-text/80 transition-colors">
                                        {language === "en" ? "Become Mentor" : "გახდი მენტორი"}
                                    </Link>
                                )} */}
                            <Link to="/faq" className="transition-colors">
                                {language === "en" ? "FAQ" : "კითხვები"}
                            </Link>
                            <Link to="/support" className="transition-colors">
                                {language === "en" ? "Support" : "დახმარება"}
                            </Link>

                            {/* Language Switcher */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => switchLanguage("en")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition`
                                    }
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => switchLanguage("ka")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition `}
                                >
                                    KA
                                </button>
                            </div>

                            {/* User Section */}
                            {!loading && (
                                <>
                                    {user ? (
                                        <div className="relative user-dropdown">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
                                            >
                                                {/* User Avatar */}
                                                <div
                                                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-light-text font-semibold text-sm"
                                                >
                                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                                </div>

                                                {/* User Name */}
                                                <span className="text-light-text font-medium">
                                                    {user.firstName} {user.lastName}
                                                </span>

                                                {/* Dropdown Arrow */}
                                                <svg className={`w-4 h-4 text-light-text transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {showDropdown && (
                                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                                    {/* User Info */}
                                                    <div className="px-4 py-3 border-b border-gray-100">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {user.firstName} {user.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${user.userType === 'mentor'
                                                            ? 'bg-purple-100 text-purple-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {user.userType === 'mentor' ? 'Mentor' : 'Student'}
                                                        </span>
                                                    </div>

                                                    {/* Menu Items */}
                                                    <button
                                                        onClick={navigateToDashboard}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                        Dashboard
                                                    </button>

                                                    {user.userType === 'mentor' && (
                                                        <>
                                                            <Link
                                                                to="/my-schedule"
                                                                onClick={() => setShowDropdown(false)}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                            >
                                                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                My Schedule
                                                            </Link>
                                                            <Link
                                                                to="/earnings"
                                                                onClick={() => setShowDropdown(false)}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                            >
                                                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Earnings
                                                            </Link>
                                                        </>
                                                    )}

                                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                                        <button
                                                            onClick={handleLogout}
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                            </svg>
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to="/auth"
                                            className="px-6 py-2 bg-secondary text-light-text rounded-full hover:opacity-90 transition-opacity"
                                        >
                                            {language === "en" ? "Get started" : "შესვლა"}
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                        {/* )} */}

                        {/* Mobile Menu Button (Hidden on dashboard pages) */}
                        {!isDashboardPage && (
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="md:hidden text-light-text"
                            >
                                {showMobileMenu ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        )}

                        {/* Mobile User Section - Show when logged in */}
                        {!loading && user && !isDashboardPage && (
                            <div className="md:hidden flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-light-text font-semibold text-sm"
                                >
                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu (Hidden on dashboard pages) */}
                    {showMobileMenu && !isDashboardPage && (
                        <nav className="md:hidden mt-6 flex flex-col gap-4">
                            <Link
                                to="/mentors"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-light-text hover:text-light-text/80 transition-colors text-left"
                            >
                                {language === "en" ? "Mentorship" : "მენტორები"}
                            </Link>
                            <Link
                                to="/blogs"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-light-text hover:text-light-text/80 transition-colors text-left"
                            >
                                {language === "en" ? "Blog" : "ბლოგი"}
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-light-text hover:text-light-text/80 transition-colors text-left"
                            >
                                {language === "en" ? "About Us" : "ჩვენს შესახებ"}
                            </Link>
                            {/* {user?.userType !== 'mentor' && (
                                <Link
                                    to="/become-mentor"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="text-light-text hover:text-light-text/80 transition-colors text-left"
                                >
                                    {language === "en" ? "Become Mentor" : "გახდი მენტორი"}
                                </Link>
                            )} */}
                            <Link
                                to="/faq"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-light-text hover:text-light-text/80 transition-colors text-left"
                            >
                                {language === "en" ? "FAQ" : "კითხვები"}
                            </Link>
                            <Link
                                to="/support"
                                onClick={() => setShowMobileMenu(false)}
                                className="text-light-text hover:text-light-text/80 transition-colors text-left"
                            >
                                {language === "en" ? "Support" : "დახმარება"}
                            </Link>

                            {/* Language Switcher Mobile */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                                <button
                                    onClick={() => switchLanguage("en")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${language === "en"
                                        ? "text-light-text bg-secondary"
                                        : "text-black hover:text-gray-700"
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => switchLanguage("ka")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${language === "ka"
                                        ? "text-light-text bg-secondary"
                                        : "text-black hover:text-gray-700"
                                        }`}
                                >
                                    KA
                                </button>
                            </div>

                            {user ? (
                                <>
                                    <button
                                        onClick={() => { navigateToDashboard(); setShowMobileMenu(false); }}
                                        className="text-light-text hover:text-light-text/80 transition-colors text-left pt-2 border-t border-white/20"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                                        className="text-secondary hover:text-secondary/80 transition-colors text-left"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/auth"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="px-6 py-2 bg-secondary text-light-text rounded-lg text-center"
                                >
                                    {language === "en" ? "Get started" : "შესვლა"}
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </header >

            {/* Main Content */}
            <main main className="flex-1" >
                <Outlet />
            </main >

            {/* Footer */}
            < Footer />

            {/* Fixed Support Button */}
            <button button className="fixed bottom-8 right-8 bg-blue-600 text-light-text p-4 rounded-full shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 z-40" >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button >
        </div >
    );
};

export default Layout;