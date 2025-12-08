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
    const [searchQuery, setSearchQuery] = useState('');

    // Filter options from API
    const [filterOptions, setFilterOptions] = useState({
        occupations: [],
        companies: [],
        yearsOfExperience: [],
        positions: [],
        universities: [],
        faculties: []
    });

    // Selected filters
    const [filters, setFilters] = useState({
        occupation: '',
        company: '',
        yearsOfExperience: '',
        position: '',
        university: '',
        faculty: ''
    });

    // Fetch filter options on mount
    useEffect(() => {
        fetchFilterOptions();
    }, []);

    // Fetch mentors when page or filters change
    useEffect(() => {
        fetchMentors();
    }, [currentPage, filters]);

    const fetchFilterOptions = async () => {
        try {
            const response = await axios.get('/api/mentors/filter-options');
            if (response.data.success) {
                setFilterOptions(response.data.filterOptions);
            }
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };

    const fetchMentors = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                ...(searchQuery && { search: searchQuery }),
                ...(filters.occupation && { occupation: filters.occupation }),
                ...(filters.company && { company: filters.company }),
                ...(filters.yearsOfExperience && { yearsOfExperience: filters.yearsOfExperience }),
                ...(filters.position && { position: filters.position }),
                ...(filters.university && { university: filters.university }),
                ...(filters.faculty && { faculty: filters.faculty })
            });

            const response = await axios.get(`/api/mentors?${params}`);

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

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            occupation: '',
            company: '',
            yearsOfExperience: '',
            position: '',
            university: '',
            faculty: ''
        });
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleMentorClick = (mentorId) => {
        navigate(`/mentor/${mentorId}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <style>{`
                .mentor-checkbox:checked::before {
                    background-color: #FA8AFF !important;
                }
            `}</style>
            {/* Hero Section */}
            <section className="relative px-8 py-16 bg-[#1F3A8A] overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat'
                    }}
                ></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl text-white mb-4">
                        იპოვე შენი იდეალური მენტორი
                    </h1>
                    <p className="text-xl text-white/90">
                        დაუკავშირდი პროფესიონალებს და მიაღწიე შენს კარიერულ მიზნებს
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-12 gap-0">
                {/* Left Sidebar - Filters */}
                <div className="col-span-3 bg-white min-h-screen px-6 py-8 border-r-2 border-gray-200">
                    {/* Occupation Area */}
                    <div className="mb-8">
                        <h3 className="text-[#1F3A8A] mb-4">მიმართულებები</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="მოძებნე მიმართულება"
                                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filterOptions.occupations.slice(0, 10).map((occ) => (
                                <label key={occ} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.occupation === occ}
                                            onChange={() => handleFilterChange('occupation', filters.occupation === occ ? '' : occ)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{occ}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Position */}
                    <div className="mb-8">
                        <h3 className="text-[#1F3A8A] mb-4">პოზიცია</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="მოძებნე პოზიცია"
                                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filterOptions.positions.slice(0, 10).map((pos) => (
                                <label key={pos} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.position === pos}
                                            onChange={() => handleFilterChange('position', filters.position === pos ? '' : pos)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{pos}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div className="mb-8">
                        <h3 className="text-[#1F3A8A] mb-4">კომპანია</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="მოძებნე კომპანია"
                                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filterOptions.companies.slice(0, 10).map((comp) => (
                                <label key={comp} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.company === comp}
                                            onChange={() => handleFilterChange('company', filters.company === comp ? '' : comp)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{comp}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Years of Experience */}
                    <div className="mb-8">
                        <h3 className="text-[#1F3A8A] mb-4">გამოცდილება</h3>
                        <div className="space-y-2">
                            {filterOptions.yearsOfExperience.map((exp) => (
                                <label key={exp} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.yearsOfExperience === exp}
                                            onChange={() => handleFilterChange('yearsOfExperience', filters.yearsOfExperience === exp ? '' : exp)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{exp} წელი</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* University */}
                    <div className="mb-8">
                        <h3 className="text-[#1F3A8A] mb-4">უნივერსიტეტი</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="მოძებნე უნივერსიტეტი"
                                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filterOptions.universities.slice(0, 10).map((uni) => (
                                <label key={uni} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.university === uni}
                                            onChange={() => handleFilterChange('university', filters.university === uni ? '' : uni)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{uni}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Faculty */}
                    <div>
                        <h3 className="text-[#1F3A8A] mb-4">ფაკულტეტი</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="მოძებნე ფაკულტეტი"
                                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filterOptions.faculties.slice(0, 10).map((fac) => (
                                <label key={fac} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.faculty === fac}
                                            onChange={() => handleFilterChange('faculty', filters.faculty === fac ? '' : fac)}
                                            className="mentor-checkbox w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-sm appearance-none checked:bg-white checked:border-[#FA8AFF] relative cursor-pointer
                                            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                            before:w-3 before:h-3 before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        />
                                        <span className="text-gray-700 text-sm">{fac}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Mentor List */}
                <div className="col-span-9 bg-gray-50 min-h-screen px-8 py-8">
                    {/* Search and Results Count */}
                    <div className="mb-6">
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 relative">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="მოძებნე უნარი, პოზიცია ან კომპანია"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#FA8AFF] focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">{totalMentors} მენტორი ნაპოვნია</p>
                            <button onClick={clearFilters} className="text-[#FA8AFF] hover:underline">
                                ყველა ფილტრის გასუფთავება
                            </button>
                        </div>
                    </div>

                    {/* Mentor Cards */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA8AFF]"></div>
                        </div>
                    ) : mentors.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">მენტორები არ მოიძებნა</h3>
                            <p className="text-gray-500">სცადეთ ფილტრების შეცვლა</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {mentors.map((mentor) => (
                                <div key={mentor.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border-2 border-gray-200">
                                    <div className="p-8">
                                        <div className="flex gap-6">
                                            {/* Mentor Photo */}
                                            <div className="flex-shrink-0 relative">
                                                {mentor.photoUrl ? (
                                                    <img
                                                        src={mentor.photoUrl}
                                                        alt={mentor.name}
                                                        className="w-44 h-56 object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=1F3A8A&color=fff&size=200`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-44 h-56 rounded-lg bg-gradient-to-br from-[#1F3A8A] to-[#FA8AFF] flex items-center justify-center">
                                                        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mentor Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-3xl text-[#1F3A8A]">{mentor.name}</h3>
                                                            <span className="text-2xl">🇬🇪</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mb-3">
                                                    <svg width="16" height="16" className="text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-gray-800">{mentor.currentPosition || 'Mentor'} • {mentor.company || mentor.university}</span>
                                                </div>

                                                {mentor.bio && (
                                                    <p className="text-gray-800 mb-4 leading-relaxed line-clamp-3">
                                                        {mentor.bio}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {mentor.occupationArea && (
                                                        <span className="px-4 py-2 bg-[#1F3A8A]/10 text-[#1F3A8A] rounded-lg text-sm border border-[#1F3A8A]/20">
                                                            {mentor.occupationArea}
                                                        </span>
                                                    )}
                                                    {mentor.university && (
                                                        <span className="px-4 py-2 bg-[#1F3A8A]/10 text-[#1F3A8A] rounded-lg text-sm border border-[#1F3A8A]/20">
                                                            {mentor.university}
                                                        </span>
                                                    )}
                                                    {mentor.faculty && (
                                                        <span className="px-4 py-2 bg-[#1F3A8A]/10 text-[#1F3A8A] rounded-lg text-sm border border-[#1F3A8A]/20">
                                                            {mentor.faculty}
                                                        </span>
                                                    )}
                                                    {mentor.yearsOfExperience && (
                                                        <span className="px-4 py-2 bg-[#1F3A8A]/10 text-[#1F3A8A] rounded-lg text-sm border border-[#1F3A8A]/20">
                                                            {mentor.yearsOfExperience} წლიანი გამოცდილება
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                    }`}
                            >
                                წინა
                            </button>

                            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === page
                                            ? 'text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                            }`}
                                        style={currentPage === page ? { backgroundColor: '#FA8AFF' } : {}}
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
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                    }`}
                            >
                                შემდეგი
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mentors;