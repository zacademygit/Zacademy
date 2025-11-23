// src/pages/AboutUs.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState('freelancers');

    const stats = [
        { number: '500+', label: 'Active Mentors' },
        { number: '10,000+', label: 'Students Helped' },
        { number: '95%', label: 'Success Rate' },
        { number: '50+', label: 'Universities' }
    ];

    const successStories = [
        {
            id: 1,
            name: 'Anna Dimitriu',
            role: 'Medical Student',
            university: 'Harvard Medical School',
            image: '/images/success-1.jpg',
            story: 'Z-Academy helped me navigate the complex medical school application process. My mentor\'s guidance was invaluable.',
            achievement: 'Accepted to Top Medical School'
        },
        {
            id: 2,
            name: 'David Chen',
            role: 'Business Student',
            university: 'Wharton School',
            image: '/images/success-2.jpg',
            story: 'The personalized mentorship I received helped me land internships at top consulting firms.',
            achievement: 'McKinsey Summer Internship'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Making way for<br />
                                <span className="text-emerald-200">breakthroughs</span>
                            </h1>
                            <p className="text-xl mb-8 text-emerald-50">
                                At Z-Academy, we're revolutionizing the way students connect with
                                mentors to achieve their academic and career goals. A personalized
                                journey to success starts here.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    to="/mentors"
                                    className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition"
                                >
                                    Find a Mentor
                                </Link>
                                <Link
                                    to="/register/mentor"
                                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition"
                                >
                                    Become a Mentor
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-emerald-500/20 rounded-2xl p-8">
                                <img
                                    src="/images/hero-person.jpg"
                                    alt="Student Success"
                                    className="rounded-xl shadow-2xl"
                                />
                                <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-gray-800 font-medium">2,341 students online</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                                    <div className="text-gray-800">
                                        <div className="text-2xl font-bold">98%</div>
                                        <div className="text-sm">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Passionate educators and technologists working together to revolutionize mentorship
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                                NK
                            </div>
                            <h3 className="text-lg font-bold mb-1">Nino Koridze</h3>
                            <p className="text-emerald-600 font-medium mb-2">Founder & CEO</p>
                            <p className="text-sm text-gray-600">
                                Visionary leader passionate about democratizing access to quality mentorship
                            </p>
                            <div className="flex justify-center gap-3 mt-3">
                                <a href="#" className="text-gray-400 hover:text-emerald-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                                ST
                            </div>
                            <h3 className="text-lg font-bold mb-1">Sarah Thompson</h3>
                            <p className="text-emerald-600 font-medium mb-2">Head of Operations</p>
                            <p className="text-sm text-gray-600">
                                Former university admissions officer with 15+ years of experience
                            </p>
                            <div className="flex justify-center gap-3 mt-3">
                                <a href="#" className="text-gray-400 hover:text-emerald-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                                MR
                            </div>
                            <h3 className="text-lg font-bold mb-1">Michael Rodriguez</h3>
                            <p className="text-emerald-600 font-medium mb-2">CTO</p>
                            <p className="text-sm text-gray-600">
                                Tech innovator building seamless connections between students and mentors
                            </p>
                            <div className="flex justify-center gap-3 mt-3">
                                <a href="#" className="text-gray-400 hover:text-emerald-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                                EL
                            </div>
                            <h3 className="text-lg font-bold mb-1">Emily Liu</h3>
                            <p className="text-emerald-600 font-medium mb-2">Head of Mentor Success</p>
                            <p className="text-sm text-gray-600">
                                Ensuring quality and supporting our community of exceptional mentors
                            </p>
                            <div className="flex justify-center gap-3 mt-3">
                                <a href="#" className="text-gray-400 hover:text-emerald-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Advisory Board */}
                    <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-center mb-8">Advisory Board</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">Dr. James Wilson</p>
                                <p className="text-xs text-gray-600">Harvard Dean</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">Maria Garcia</p>
                                <p className="text-xs text-gray-600">EdTech Investor</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">David Kim</p>
                                <p className="text-xs text-gray-600">Google Executive</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">Rachel Adams</p>
                                <p className="text-xs text-gray-600">MIT Professor</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">Tom Anderson</p>
                                <p className="text-xs text-gray-600">Startup Founder</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-semibold">Linda Chen</p>
                                <p className="text-xs text-gray-600">Yale Admissions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Solutions Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">Our solutions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
                            <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                                <img
                                    src="/images/solution-1.jpg"
                                    alt="Personalized Guidance"
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">From High School to Career</h3>
                            <p className="text-gray-600 mb-6">
                                Get personalized guidance at every step of your academic journey.
                                From university applications to career planning, our mentors have been there.
                            </p>
                            <Link to="/mentors" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                                Explore Mentors
                            </Link>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                            <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                                <img
                                    src="/images/solution-2.jpg"
                                    alt="Team Solutions"
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Team Solutions for Groups</h3>
                            <p className="text-gray-600 mb-6">
                                Group mentoring sessions for student organizations, study groups,
                                or friends applying to similar programs together.
                            </p>
                            <Link to="/group-sessions" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4">Success Stories</h2>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Real students, real results. See how Z-Academy has helped students achieve their dreams.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {successStories.map((story) => (
                            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-50 p-8">
                                    <div className="w-24 h-24 bg-emerald-200 rounded-full mx-auto mb-4"></div>
                                    <div className="text-center">
                                        <h4 className="font-bold text-lg">{story.name}</h4>
                                        <p className="text-sm text-gray-600">{story.role}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full inline-block mb-4">
                                        {story.achievement}
                                    </div>
                                    <p className="text-gray-600 mb-4">{story.story}</p>
                                    <p className="text-sm text-gray-500">{story.university}</p>
                                </div>
                            </div>
                        ))}

                        {/* Add more story placeholder */}
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-8 flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-6xl mb-4">+</div>
                                <h4 className="text-xl font-bold mb-2">Your Story Here</h4>
                                <p className="mb-6">Join thousands of successful students</p>
                                <Link to="/register" className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition inline-block">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">How It's on Z-Academy</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-emerald-600">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Find Your Perfect Mentor</h3>
                            <p className="text-gray-600">
                                Browse through our verified mentors, filter by expertise, university,
                                and career path to find your ideal match.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-emerald-600">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Book Your Session</h3>
                            <p className="text-gray-600">
                                Schedule sessions at your convenience. Choose from various services
                                like application review, interview prep, or career guidance.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-emerald-600">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Achieve Your Goals</h3>
                            <p className="text-gray-600">
                                Get personalized guidance, actionable feedback, and ongoing support
                                to reach your academic and career objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Change How the World Works Together Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Change how the world<br />learns together.
                    </h2>
                    <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                        Join our community of mentors and students creating breakthrough moments every day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link to="/register" className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition">
                            Join as a Student
                        </Link>
                        <Link to="/register/mentor" className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition">
                            Become a Mentor
                        </Link>
                    </div>

                    {/* Platform Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-emerald-600 text-3xl font-bold mb-2">24/7</div>
                            <div className="text-gray-600">Support Available</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-emerald-600 text-3xl font-bold mb-2">15+</div>
                            <div className="text-gray-600">Countries</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-emerald-600 text-3xl font-bold mb-2">100%</div>
                            <div className="text-gray-600">Verified Mentors</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-emerald-600 text-3xl font-bold mb-2">4.9★</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-emerald-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Are you a <span className="italic">student</span> looking<br />
                        for guidance?
                    </h2>
                    <p className="text-xl mb-8 text-emerald-50">
                        Start your journey to academic and career success today.
                    </p>
                    <Link to="/register" className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition inline-block">
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Business Section */}
            <section className="py-20 bg-emerald-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Are you a <span className="italic">business</span> needing<br />
                        help on a project?
                    </h2>
                    <p className="text-xl mb-8 text-emerald-100">
                        Partner with Z-Academy for corporate mentorship programs and talent development.
                    </p>
                    <Link to="/business" className="bg-white text-emerald-700 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition inline-block">
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Footer Links */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <Link to="/about" className="text-gray-600 hover:text-emerald-600 font-medium">
                            About Us
                        </Link>
                        <Link to="/how-it-works" className="text-gray-600 hover:text-emerald-600 font-medium">
                            How It Works
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-emerald-600 font-medium">
                            Contact
                        </Link>
                        <Link to="/careers" className="text-gray-600 hover:text-emerald-600 font-medium">
                            Careers
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;