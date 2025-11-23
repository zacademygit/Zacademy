// src/pages/Mentors.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const Mentors = () => {
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalMentors, setTotalMentors] = useState(0);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [searchQuery, setSearchQuery] = useState('');

    // Filters
    const [filters, setFilters] = useState({
        fieldOfStudy: '',
        university: '',
        workingLanguage: ''
    });

    // Job titles for filter
    const jobTitles = [
        'Engineering Manager',
        'Senior Engineer',
        'Product Manager',
        'CTO',
        'Founder',
        'Designer',
        'Data Scientist',
        'Machine Learning Engineer',
        'Marketing Manager',
        'Recruiter'
    ];

    const companies = [
        'Facebook/Meta',
        'Apple',
        'Amazon/Amazon Web Services',
        'Netflix',
        'Google/Alphabet',
        'Microsoft'
    ];

    useEffect(() => {
        fetchMentors();
    }, [currentPage, filters]);

    const fetchMentors = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                ...(filters.fieldOfStudy && { fieldOfStudy: filters.fieldOfStudy }),
                ...(filters.university && { university: filters.university }),
                ...(filters.workingLanguage && { workingLanguage: filters.workingLanguage })
            });

            const response = await axios.get(`api/mentors?${params}`);

            if (response.data.success) {
                setMentors(response.data.mentors);
                setTotalPages(response.data.totalPages);
                setTotalMentors(response.data.totalMentors);
            }
        } catch (error) {
            console.error('Error fetching mentors:', error);
            toast.error('Failed to load mentors');
        } finally {
            setLoading(false);
        }
    };

    const handleMentorClick = (mentorId) => {
        navigate(`/mentor/${mentorId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link to="/" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-700">Mentor</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* Header */}
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-2">
                                    Find Your <span className="text-purple-600">Mentor</span>
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Search for a mentor by your needs and preferences
                                </p>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center gap-2 mb-6">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${viewMode === 'list'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    List <span className="text-xs text-gray-400">(with bio)</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${viewMode === 'grid'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Grid
                                </button>
                            </div>


                            {/* Filters */}
                            <div className="space-y-6">
                                {/* Name or Job Title */}
                                <div>
                                    <h3 className="font-semibold text-sm mb-3">Name or Job Title</h3>
                                    <input
                                        type="text"
                                        placeholder="Search by name or job title..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="mt-3 space-y-2">
                                        {jobTitles.slice(0, 5).map((title) => (
                                            <label key={title} className="flex items-center text-sm text-gray-600">
                                                <input type="checkbox" className="mr-2 rounded" />
                                                {title}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Company */}
                                <div>
                                    <h3 className="font-semibold text-sm mb-3">Company</h3>
                                    <input
                                        type="text"
                                        placeholder="Search by company..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-3"
                                    />
                                    <div className="space-y-2">
                                        {companies.slice(0, 5).map((company) => (
                                            <label key={company} className="flex items-center text-sm text-gray-600">
                                                <input type="checkbox" className="mr-2 rounded" />
                                                {company}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Mentor Cards */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : mentors.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No mentors found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        ) : viewMode === 'list' ? (
                            // List View
                            <div className="space-y-6">
                                {mentors.map((mentor) => (
                                    <div key={mentor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                                        <div className="flex">
                                            {/* Mentor Photo */}
                                            <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden flex-shrink-0">
                                                {mentor.photoUrl ? (
                                                    <img
                                                        src={mentor.photoUrl}
                                                        alt={mentor.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=3b82f6&color=fff&size=200`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mentor Info */}
                                            <div className="flex-1 p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{mentor.name}</h2>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">
                                                                {mentor.expertise || 'General Mentoring'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* University */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                    </svg>
                                                    <span className="text-gray-700 font-medium">{mentor.university || 'Independent'}</span>
                                                </div>

                                                {/* Languages */}
                                                {mentor.workingLanguages && mentor.workingLanguages.length > 0 && (
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                        </svg>
                                                        <span className="text-gray-600 text-sm">Working Languages:</span>
                                                        <div className="flex gap-2">
                                                            {mentor.workingLanguages.map((lang, idx) => (
                                                                <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                    {lang}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* About Me */}
                                                {mentor.aboutMe && (
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {mentor.aboutMe}
                                                    </p>
                                                )}

                                                {/* Action Row */}
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Starting from</p>
                                                        <p className="text-xl font-bold text-gray-900">
                                                            {Math.random() > 0.5 ? 'Free' : `$${Math.floor(Math.random() * 50 + 20)}/hour`}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleMentorClick(mentor.id)}
                                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
                                                    >
                                                        Book Session
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Grid View
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mentors.map((mentor) => (
                                    <div key={mentor.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                                        {/* Card Header with Gradient */}
                                        <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                                            <div className="absolute inset-0 bg-black/10"></div>
                                        </div>

                                        {/* Avatar */}
                                        <div className="relative px-6 -mt-12 mb-4">
                                            <div className="w-24 h-24 mx-auto">
                                                {mentor.photoUrl ? (
                                                    <img
                                                        src={mentor.photoUrl}
                                                        alt={mentor.name}
                                                        className="w-full h-full rounded-full object-cover bg-white border-4 border-white shadow-lg"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=3b82f6&color=fff&size=100`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="px-6 pb-6">
                                            {/* Name & Expertise */}
                                            <div className="text-center mb-4">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                                                    {mentor.name}
                                                </h3>
                                                <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full">
                                                    {mentor.expertise || 'General Mentoring'}
                                                </span>
                                            </div>

                                            {/* University */}
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 truncate">
                                                    {mentor.university || 'Independent'}
                                                </span>
                                            </div>

                                            {/* Working Languages */}
                                            {mentor.workingLanguages && mentor.workingLanguages.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                        </svg>
                                                        <span className="text-xs text-gray-600 font-semibold">Working Languages</span>
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {mentor.workingLanguages.map((lang, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-full"
                                                            >
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* About Me Preview */}
                                            {mentor.aboutMe && (
                                                <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                                                    {mentor.aboutMe}
                                                </p>
                                            )}

                                            {/* CTA */}
                                            <button
                                                onClick={() => handleMentorClick(mentor.id)}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Book Session
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                        }`}
                                >
                                    Previous
                                </button>

                                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 rounded-lg ${currentPage === page
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentors;