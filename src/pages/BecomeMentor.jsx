// src/pages/MentorApplication.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const BecomeMentor = () => {
    const [showFAQ, setShowFAQ] = useState(false);

    const benefits = [
        {
            icon: '🎯',
            title: 'Connect directly with elite students',
            description: 'Work with motivated students from top universities worldwide, building lasting relationships and helping shape future leaders.'
        },
        {
            icon: '💰',
            title: 'Set your own rates',
            description: 'You decide your hourly rate and service offerings. Earn what you\'re worth while maintaining full control over your schedule.'
        },
        {
            icon: '🚀',
            title: 'Grow and earn more',
            description: 'As you build your reputation, attract more students and increase your rates. Top mentors earn over $10,000 per month.'
        }
    ];

    const tools = [
        {
            title: 'Intelligent Matching',
            description: 'Our AI matches you with students who need your specific expertise',
            icon: '🤖'
        },
        {
            title: 'Flexible Schedule',
            description: 'Set your availability and manage bookings on your terms',
            icon: '📅'
        },
        {
            title: 'Secure Payments',
            description: 'Get paid on time, every time, with our secure payment system',
            icon: '💳'
        },
        {
            title: 'Analytics Dashboard',
            description: 'Track your performance and grow your mentoring business',
            icon: '📊'
        }
    ];

    const successStories = [
        {
            name: "Dr. Sarah Chen",
            role: "MIT Professor",
            quote: "Z-Academy has transformed how I connect with aspiring engineers. I've helped over 50 students get into top programs while earning significant supplementary income.",
            image: "/images/mentor-1.jpg"
        },
        {
            name: "James Wilson",
            role: "Former Goldman Sachs VP",
            quote: "The platform made it easy to share my finance expertise. I love seeing my mentees land dream jobs at top firms.",
            image: "/images/mentor-2.jpg"
        }
    ];

    const faqs = [
        {
            question: "Who can become a mentor on Z-Academy?",
            answer: "We welcome professionals, academics, and experts with proven track records in their fields. You should have relevant educational credentials or significant professional experience."
        },
        {
            question: "How much can I earn as a mentor?",
            answer: "Mentors set their own rates, typically ranging from $50-$500 per hour. Top mentors earn over $10,000 monthly working part-time."
        },
        {
            question: "What support does Z-Academy provide?",
            answer: "We provide training resources, marketing support, scheduling tools, secure payments, and dedicated mentor success team support."
        },
        {
            question: "How much time commitment is required?",
            answer: "You have complete flexibility. Some mentors work 2-3 hours per week, others full-time. You control your availability."
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-sm uppercase tracking-wider mb-4 text-purple-200">
                            Z-ACADEMY MENTORS
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            Ready to grow your<br />
                            <span className="italic">business as a Z-Academy mentor?</span>
                        </h1>
                        <p className="text-xl mb-8 text-purple-100">
                            Join an exclusive network of top educators and start making an impact. Apply today to
                            help guide the next generation and build your mentoring business.
                        </p>
                        <Link to="/register/mentor" className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition text-lg">
                            Apply Now
                        </Link>
                    </div>

                    {/* Hero Images */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <div className="bg-white rounded-lg p-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4"></div>
                                <div className="text-purple-900 font-semibold">Sarah M.</div>
                                <div className="text-purple-700 text-sm">Harvard Mentor</div>
                                <div className="flex mt-2">
                                    {'⭐'.repeat(5)}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:mt-8">
                            <div className="bg-white rounded-lg p-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4"></div>
                                <div className="text-purple-900 font-semibold">Michael R.</div>
                                <div className="text-purple-700 text-sm">Stanford Advisor</div>
                                <div className="flex mt-2">
                                    {'⭐'.repeat(5)}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <div className="bg-white rounded-lg p-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4"></div>
                                <div className="text-purple-900 font-semibold">Emma L.</div>
                                <div className="text-purple-700 text-sm">MIT Coach</div>
                                <div className="flex mt-2">
                                    {'⭐'.repeat(5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Why choose Z-Academy for your mentoring business?
                    </h2>

                    <div className="space-y-16 max-w-4xl mx-auto">
                        {/* Benefit 1 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{benefits[0].title}</h3>
                                <p className="text-gray-600 text-lg">{benefits[0].description}</p>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-emerald-600 text-2xl">
                                            📊
                                        </div>
                                        <div>
                                            <div className="font-semibold">Top Student Match</div>
                                            <div className="text-sm opacity-90">98% satisfaction rate</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {'⭐'.repeat(5)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="text-4xl font-bold text-purple-900">$125</div>
                                        <div className="bg-purple-900 text-white px-3 py-1 rounded-full text-sm">
                                            Avg hourly rate
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sessions/month</span>
                                            <span className="font-semibold">12</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monthly earnings</span>
                                            <span className="font-semibold text-green-600">$1,500+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-2xl font-bold mb-4">{benefits[1].title}</h3>
                                <p className="text-gray-600 text-lg">{benefits[1].description}</p>
                            </div>
                        </div>

                        {/* Benefit 3 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{benefits[2].title}</h3>
                                <p className="text-gray-600 text-lg">{benefits[2].description}</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 text-white">
                                <div className="text-center">
                                    <div className="text-5xl mb-2">📈</div>
                                    <div className="text-3xl font-bold mb-2">3x Growth</div>
                                    <div className="text-purple-200">Average mentor income growth in first year</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/register/mentor" className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition text-lg">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Equip your business with the tools for success
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need to build and grow your mentoring practice
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {tools.map((tool, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{tool.icon}</div>
                                <h3 className="font-bold mb-2">{tool.title}</h3>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Want access to these exclusive tools?
                    </h2>
                    <p className="text-xl mb-8 text-purple-100">
                        Join Z-Academy and start building your mentoring business today
                    </p>
                    <Link to="/register/mentor" className="inline-block bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
                        Apply Now
                    </Link>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Mentors share their success
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {successStories.map((story, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                                <p className="text-gray-700 mb-6 italic text-lg">"{story.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                                    <div>
                                        <div className="font-bold">{story.name}</div>
                                        <div className="text-gray-600">{story.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Next Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">What's next?</h2>

                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📝</span>
                            </div>
                            <h3 className="font-bold mb-2">Apply Today</h3>
                            <p className="text-sm text-gray-600">
                                Complete our simple application in just 5 minutes
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">✉️</span>
                            </div>
                            <h3 className="font-bold mb-2">Wait for Approval</h3>
                            <p className="text-sm text-gray-600">
                                We'll review your application within 48 hours
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="font-bold mb-2">Complete Onboarding</h3>
                            <p className="text-sm text-gray-600">
                                Set up your profile and start accepting students
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="font-bold mb-2">Start Growing</h3>
                            <p className="text-sm text-gray-600">
                                Build your reputation and grow your income
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Frequently asked questions
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow">
                                <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">
                            Still have questions? Check out our detailed guide
                        </p>
                        <Link to="/guides/become-mentor" className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition">
                            View Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-bold mb-6">
                        Ready to transform lives and grow your business?
                    </h2>
                    <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                        Join our exclusive network of mentors and start making an impact today
                    </p>
                    <Link to="/register/mentor" className="inline-block bg-white text-purple-900 px-10 py-5 rounded-lg font-bold hover:bg-gray-100 transition text-xl">
                        Apply Now
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default BecomeMentor;