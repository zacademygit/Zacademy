// src/pages/Index.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Index = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const stats = [
        { value: '80%', label: 'University Acceptance Rate', sublabel: 'Students get accepted to their dream universities' },
        { value: '3X', label: 'Faster Applications', sublabel: 'Complete applications 3x faster with guidance' },
        { value: '1/2', label: 'Reduced Stress', sublabel: 'Half the stress with expert support' }
    ];

    const benefits = [
        {
            icon: '🎯',
            title: 'Get Local Expertise Unlimited',
            description: 'Connect with mentors who understand your educational system and goals'
        },
        {
            icon: '💎',
            title: 'Premium Learning Experience',
            description: 'One-on-one personalized sessions tailored to your needs'
        },
        {
            icon: '🚀',
            title: 'Certified Guidance Crafting',
            description: 'Work with verified mentors who have proven track records'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Accepted to MIT',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            quote: 'Z Academy helped me navigate the complex MIT application process. My mentor\'s guidance was invaluable!',
            rating: 5
        },
        {
            name: 'David Kim',
            role: 'Full Scholarship at Stanford',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            quote: 'Thanks to my mentor, I secured a full scholarship. The ROI on mentoring sessions was incredible!',
            rating: 5
        },
        {
            name: 'Maria Garcia',
            role: 'Oxford University',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            quote: 'The essay review sessions transformed my application. I couldn\'t have done it without Z Academy!',
            rating: 5
        }
    ];

    const features = [
        {
            title: 'University Applications',
            description: 'Expert guidance for undergraduate and graduate applications',
            icon: '🎓'
        },
        {
            title: 'Scholarship Essays',
            description: 'Craft compelling essays that win scholarships',
            icon: '✍️'
        },
        {
            title: 'Career Planning',
            description: 'Strategic career guidance from industry professionals',
            icon: '💼'
        },
        {
            title: 'Interview Prep',
            description: 'Mock interviews with experienced mentors',
            icon: '🎤'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="container mx-auto px-4 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                                Now accepting applications for 2025
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                360° Automated
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Mentoring</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Smart AI-powered platform connecting students with verified mentors.
                                Get personalized guidance for university applications, scholarships, and career planning.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to={user ? "/mentors" : "/auth"}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    Get Started Free
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-200 hover:bg-purple-50 transition">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3.5a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3.5z" />
                                    </svg>
                                    Watch Demo
                                </button>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-900">2,500+</span> students already enrolled
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform rotate-3 blur-2xl opacity-20"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                                            <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 font-medium">See how it works</p>
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    <div className="bg-purple-50 rounded-xl p-3 text-center">
                                        <div className="text-2xl font-bold text-purple-600">98%</div>
                                        <div className="text-xs text-gray-600">Success Rate</div>
                                    </div>
                                    <div className="bg-pink-50 rounded-xl p-3 text-center">
                                        <div className="text-2xl font-bold text-pink-600">24/7</div>
                                        <div className="text-xs text-gray-600">Support</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                                        <div className="text-2xl font-bold text-blue-600">500+</div>
                                        <div className="text-xs text-gray-600">Mentors</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-50"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-40"></div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Benefits of Using Z Academy
                    </h2>
                    <p className="text-center text-purple-100 mb-12 max-w-2xl mx-auto">
                        Join thousands of students who have transformed their academic journey
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</div>
                                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                                <div className="text-purple-200 text-sm">{stat.sublabel}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        How Z Academy Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="text-4xl mb-4">{benefit.icon}</div>
                                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                                {index < benefits.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Here Candidates Based on
                            <span className="text-purple-600"> Experience & Personality</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our AI-powered matching system connects you with the perfect mentor based on your goals,
                            background, and learning style
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/services"
                            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
                        >
                            Explore all features
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Why you should TRY Z Academy</h2>
                            <p className="text-xl text-gray-600">Join the revolution in personalized education</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <span className="text-purple-600 font-bold">01</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">No Upfront Costs</h3>
                                        <p className="text-gray-600">Start with our free tier and upgrade only when you need more features</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <span className="text-purple-600 font-bold">02</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Job Recommendation Engine</h3>
                                        <p className="text-gray-600">AI-powered recommendations based on your profile and goals</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <span className="text-purple-600 font-bold">03</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Integration</h3>
                                        <p className="text-gray-600">Seamlessly integrate with your existing tools and workflows</p>
                                    </div>
                                </div>

                                <Link
                                    to="/about"
                                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                                >
                                    Learn More
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Awards, <span className="text-purple-600">Achievements</span> & Facts
                        </h2>
                        <p className="text-xl text-gray-600">What our students are saying</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="flex items-center gap-6 mb-6">
                                <img
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">{testimonials[currentTestimonial].name}</h3>
                                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-700 italic">
                                "{testimonials[currentTestimonial].quote}"
                            </blockquote>
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial
                                            ? 'bg-purple-600 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        See What Users Are Saying
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100"></div>
                                <div className="p-4">
                                    <h3 className="font-bold mb-1">Success Story #{i}</h3>
                                    <p className="text-sm text-gray-600">From community college to Ivy League</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/success-stories"
                            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
                        >
                            View all success stories
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Happy Customers */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Happy <span className="text-purple-600">Customers</span> About Us
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">
                                    "The mentorship I received was life-changing. My mentor helped me get into my dream university!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold">Student {i}</p>
                                        <p className="text-sm text-gray-600">University Applicant</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Founders <span className="text-purple-600">Committed</span> to Help
                        </h2>
                        <p className="text-xl text-gray-600">You are mentored by Industry experts</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: 'Alex Chen', role: 'CEO & Founder', expertise: 'Stanford MBA' },
                            { name: 'Sarah Williams', role: 'Head of Education', expertise: 'Harvard Ed.D' },
                            { name: 'Michael Johnson', role: 'Chief Mentor', expertise: 'MIT Alumni' },
                            { name: 'Emma Davis', role: 'Student Success', expertise: 'Oxford Graduate' }
                        ].map((founder, i) => (
                            <div key={i} className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                                <h3 className="font-bold text-lg">{founder.name}</h3>
                                <p className="text-purple-600 text-sm mb-1">{founder.role}</p>
                                <p className="text-gray-600 text-sm">{founder.expertise}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
                        <p className="text-xl text-gray-600">Tips and insights for your academic journey</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: 'How to Write a Winning Personal Statement',
                                category: 'Application Tips',
                                date: 'Nov 10, 2024',
                                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'
                            },
                            {
                                title: 'Top 10 Scholarships for International Students',
                                category: 'Scholarships',
                                date: 'Nov 8, 2024',
                                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
                            },
                            {
                                title: 'Interview Preparation: Common Questions',
                                category: 'Interview Prep',
                                date: 'Nov 5, 2024',
                                image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400'
                            }
                        ].map((post, i) => (
                            <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100"></div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-500">{post.date}</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                                    <Link to="/blogs" className="text-purple-600 font-medium text-sm hover:text-purple-700">
                                        Read more →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                        >
                            View All Posts
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Academic Journey?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who have achieved their dreams with Z Academy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/auth"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/mentors"
                            className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-400 transition"
                        >
                            Browse Mentors
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-gray-600 mb-8">
                            Get the latest tips, scholarships, and opportunities delivered to your inbox
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-4">
                            No spam, unsubscribe anytime. Read our Privacy Policy.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;