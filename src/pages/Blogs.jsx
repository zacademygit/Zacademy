// src/pages/Guides.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Guides = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Guides' },
        { id: 'university', name: 'University Applications' },
        { id: 'essays', name: 'Essay Writing' },
        { id: 'interviews', name: 'Interview Prep' },
        { id: 'careers', name: 'Career Development' },
        { id: 'scholarships', name: 'Scholarships' },
        { id: 'student-life', name: 'Student Life' },
        { id: 'test-prep', name: 'Test Preparation' }
    ];

    const guides = [
        {
            id: 1,
            title: "What Makes a Winning University Application?",
            description: "Essential components and strategies for crafting standout applications to top universities",
            category: "university",
            image: "bg-gradient-to-br from-emerald-400 to-emerald-600",
            tag: "UNIVERSITY APPLICATIONS",
            featured: true
        },
        {
            id: 2,
            title: "Stanford vs MIT: Choosing the Right Tech School",
            description: "Comprehensive comparison of two leading technology institutions to help you decide",
            category: "university",
            image: "bg-gradient-to-br from-blue-400 to-blue-600",
            tag: "UNIVERSITY GUIDES"
        },
        {
            id: 3,
            title: "From High School to Harvard: The Ultimate Guide",
            description: "Step-by-step roadmap for ambitious students aiming for Ivy League admission",
            category: "university",
            image: "bg-gradient-to-br from-purple-400 to-purple-600",
            tag: "UNIVERSITY GUIDES",
            featured: true
        },
        {
            id: 4,
            title: "How to Write a Personal Statement That Stands Out",
            description: "Expert tips and examples for crafting compelling personal narratives",
            category: "essays",
            image: "bg-gradient-to-br from-pink-400 to-pink-600",
            tag: "ESSAY WRITING"
        },
        {
            id: 5,
            title: "Scholarship Applications: Maximize Your Chances",
            description: "Proven strategies for securing financial aid and scholarships",
            category: "scholarships",
            image: "bg-gradient-to-br from-yellow-400 to-yellow-600",
            tag: "SCHOLARSHIPS"
        },
        {
            id: 6,
            title: "Medical School Interview: Complete Preparation Guide",
            description: "Master the MMI and traditional interview formats with expert guidance",
            category: "interviews",
            image: "bg-gradient-to-br from-red-400 to-red-600",
            tag: "INTERVIEW PREP"
        },
        {
            id: 7,
            title: "10 Best Study Abroad Programs in 2025",
            description: "Explore top international education opportunities and how to apply",
            category: "student-life",
            image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
            tag: "STUDENT LIFE"
        },
        {
            id: 8,
            title: "SAT vs ACT: Which Test is Right for You?",
            description: "Comprehensive comparison to help you choose the best standardized test",
            category: "test-prep",
            image: "bg-gradient-to-br from-teal-400 to-teal-600",
            tag: "TEST PREPARATION"
        },
        {
            id: 9,
            title: "Building Your College Resume: A Timeline Guide",
            description: "Year-by-year plan for developing a competitive extracurricular profile",
            category: "university",
            image: "bg-gradient-to-br from-orange-400 to-orange-600",
            tag: "UNIVERSITY APPLICATIONS"
        },
        {
            id: 10,
            title: "Common App Essays: 25 Examples That Worked",
            description: "Real successful essays with expert analysis and tips",
            category: "essays",
            image: "bg-gradient-to-br from-cyan-400 to-cyan-600",
            tag: "ESSAY WRITING"
        },
        {
            id: 11,
            title: "Investment Banking: Breaking Into the Industry",
            description: "Complete guide for students targeting top finance careers",
            category: "careers",
            image: "bg-gradient-to-br from-gray-600 to-gray-800",
            tag: "CAREER DEVELOPMENT"
        },
        {
            id: 12,
            title: "Research Opportunities for High School Students",
            description: "How to find and secure meaningful research positions",
            category: "student-life",
            image: "bg-gradient-to-br from-lime-400 to-lime-600",
            tag: "STUDENT LIFE"
        },
        {
            id: 13,
            title: "Letters of Recommendation: Getting Stellar References",
            description: "How to request and secure impactful recommendation letters",
            category: "university",
            image: "bg-gradient-to-br from-rose-400 to-rose-600",
            tag: "UNIVERSITY APPLICATIONS"
        },
        {
            id: 14,
            title: "GMAT vs GRE: MBA Application Strategy",
            description: "Choose the right test for your business school goals",
            category: "test-prep",
            image: "bg-gradient-to-br from-violet-400 to-violet-600",
            tag: "TEST PREPARATION"
        },
        {
            id: 15,
            title: "Gap Year Guide: Making the Most of Your Time",
            description: "Strategic planning for a productive and impressive gap year",
            category: "student-life",
            image: "bg-gradient-to-br from-amber-400 to-amber-600",
            tag: "STUDENT LIFE"
        },
        {
            id: 16,
            title: "Tech Internships: Landing FAANG Opportunities",
            description: "Complete guide to securing internships at top tech companies",
            category: "careers",
            image: "bg-gradient-to-br from-slate-600 to-slate-800",
            tag: "CAREER DEVELOPMENT"
        },
        {
            id: 17,
            title: "Rhodes Scholarship: Complete Application Guide",
            description: "Everything you need to know about this prestigious opportunity",
            category: "scholarships",
            image: "bg-gradient-to-br from-emerald-500 to-emerald-700",
            tag: "SCHOLARSHIPS"
        },
        {
            id: 18,
            title: "Pre-Med Timeline: From Freshman to Med School",
            description: "Four-year roadmap for aspiring medical students",
            category: "careers",
            image: "bg-gradient-to-br from-blue-500 to-blue-700",
            tag: "CAREER DEVELOPMENT"
        }
    ];

    const popularGuides = [
        "How to Start a Successful University Application in 2025",
        "What is financial aid?",
        "How to Start an Online Application in 11 Steps (+Best Ideas)",
        "How to turn your skills into a profitable career path",
        "15 Ways to promote your academic achievements online"
    ];

    const filteredGuides = selectedCategory === 'all'
        ? guides
        : guides.filter(guide => guide.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white">

            <div className="flex">
                {/* Left Sidebar */}
                <div className="w-64 min-h-screen p-6">
                    <div className="mb-8">
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                            Choose Your Topic
                        </h3>
                        <ul className="space-y-2">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === category.id
                                            ? 'bg-emerald-50 text-emerald-600 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                            The Most Popular Guides
                        </h3>
                        <ul className="space-y-3">
                            {popularGuides.map((guide, index) => (
                                <li key={index}>
                                    <a href="#" className="text-sm text-gray-700 hover:text-emerald-600 hover:underline">
                                        {guide}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Hero Section */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Academic success and career guidance
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl">
                            Everything you need to know to excel in your education
                        </p>
                        <p className="text-gray-500 mt-2">
                            Practical online resources covering everything you need to know about university
                            applications, essay writing, test preparation, scholarships, and career planning.
                        </p>
                    </div>

                    {/* Featured Guides Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGuides.map((guide) => (
                            <Link
                                key={guide.id}
                                to={`/guides/${guide.id}`}
                                className="group block overflow-hidden rounded-xl border hover:shadow-lg transition-all"
                            >
                                {/* Image/Color Block */}
                                <div className={`h-48 ${guide.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
                                    {guide.featured && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                                            <span className="text-xs font-semibold">Featured</span>
                                        </div>
                                    )}
                                    {/* Placeholder graphic elements */}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="w-16 h-16 bg-white/20 rounded-lg"></div>
                                        <div className="w-12 h-20 bg-white/20 rounded-lg"></div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 bg-white">
                                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                                        {guide.tag}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition line-clamp-2">
                                        {guide.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {guide.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                            Load More Guides
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Guides;