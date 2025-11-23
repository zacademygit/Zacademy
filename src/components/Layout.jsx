// src/components/Layout.jsx

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useLanguage } from '../contexts/LanguageContext';

const Layout = () => {
    const navigate = useNavigate();
    const { language, switchLanguage } = useLanguage();
    const { user, logout, loading } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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
        } else if (user?.userType === 'student') {
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
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
                }`}>
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                                Z Academy
                            </div>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/mentors" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                {language === "en" ? "Mentor" : "მენტორები"}
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                {language === "en" ? "About Us" : "ჩვენს შესახებ"}
                            </Link>
                            {user?.userType !== 'mentor' && (
                                <Link to="/become-mentor" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                    {language === "en" ? "Become mentor" : "გახდი მენტორი"}

                                </Link>
                            )}
                            <Link to="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                {language === "en" ? "Blog" : "ბლოგი"}
                            </Link>
                            <Link to="/faq" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                {language === "en" ? "FAQ" : "კითხვები"}
                            </Link>
                            <Link to="/support" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                {language === "en" ? "Support" : "დახმარება"}
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <div className="hidden md:flex items-center space-x-2">
                                <button
                                    onClick={() => switchLanguage("en")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition 
            ${language === "en" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"}`}
                                >
                                    EN
                                </button>

                                <button
                                    onClick={() => switchLanguage("ka")}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition 
            ${language === "ka" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"}`}
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
                                                className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition"
                                            >
                                                {/* User Avatar */}
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                                </div>

                                                {/* User Name */}
                                                <span className="text-gray-700 font-medium hidden md:block">
                                                    {user.firstName} {user.lastName}
                                                </span>

                                                {/* Dropdown Arrow */}
                                                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                                        >
                                            {language === "en" ? "Get started" : "შესვლა"}
                                        </Link>
                                    )}
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="md:hidden text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {showMobileMenu && (
                        <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
                            <div className="flex flex-col space-y-3">
                                <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
                                <Link to="/mentors" className="text-gray-700 hover:text-blue-600 transition">Mentors</Link>
                                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About Us</Link>
                                {user?.userType !== 'mentor' && (
                                    <Link to="/become-mentor" className="text-gray-700 hover:text-blue-600 transition">Become Mentor</Link>
                                )}
                                <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition">Blog</Link>
                                <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition">FAQ</Link>

                                {user && (
                                    <>
                                        <hr className="border-gray-200" />
                                        <button onClick={navigateToDashboard} className="text-gray-700 hover:text-blue-600 transition text-left">
                                            Dashboard
                                        </button>
                                        <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition text-left">
                                            Sign Out
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer - Same as before */}
            <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg inline-block mb-4">
                                Z Academy
                            </div>
                            <p className="text-gray-400">
                                Empowering students worldwide through personalized mentorship.
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                                <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                                <li><Link to="/mentors" className="hover:text-white transition">Find Mentors</Link></li>
                                <li><Link to="/become-mentor" className="hover:text-white transition">Become a Mentor</Link></li>
                                <li><Link to="/blogs" className="hover:text-white transition">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-bold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                                <li><Link to="/support" className="hover:text-white transition">Contact Us</Link></li>
                                <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
                                <li><a href="mailto:support@z-academy.com" className="hover:text-white transition">support@z-academy.com</a></li>
                                <li><a href="tel:+995555123456" className="hover:text-white transition">+995 555 123 456</a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                                <li><Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
                                <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Z Academy. All rights reserved. Made with ❤️ in Georgia.</p>
                    </div>
                </div>
            </footer>

            {/* Fixed Support Button */}
            <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 z-40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button>
        </div>
    );
};

export default Layout;