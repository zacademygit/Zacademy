// src/pages/Support.jsx

import { Link } from 'react-router-dom';

const Support = () => {
    const faqs = [
        {
            question: "How do I book a mentoring session?",
            answer: "Browse our mentor profiles, select a mentor that matches your needs, and click on their available time slots to book a session."
        },
        {
            question: "What if I need to cancel a session?",
            answer: "You can cancel a session up to 24 hours before the scheduled time from your dashboard without any penalties."
        },
        {
            question: "How do I become a mentor?",
            answer: "Visit our 'Become a Mentor' page, fill out the application form, and our team will review your profile within 3-5 business days."
        },
        {
            question: "Is my payment information secure?",
            answer: "Yes, we use industry-standard encryption and secure payment processing to protect all your financial information."
        },
        {
            question: "Can I get a refund?",
            answer: "Refunds are available if requested at least 48 hours before your scheduled session. Please contact support for assistance."
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16 space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                                How Can We <span className="text-emerald-600">Help You?</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Get in touch with our support team. We're here to help you succeed.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
                            {/* Contact Info Cards */}
                            <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                                <p className="text-gray-600 mb-4">Send us an email anytime</p>
                                <a href="mailto:support@lesgo.ge" className="text-emerald-600 hover:underline text-lg font-medium">
                                    support@lesgo.ge
                                </a>
                            </div>

                            <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Response Time</h3>
                                <p className="text-gray-600 mb-4">We typically respond within</p>
                                <p className="text-gray-900 font-semibold text-lg">24 hours</p>
                            </div>
                        </div>

                        {/* Support Portal and FAQ */}
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div className="lg:sticky lg:top-24 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-xl p-8">
                                <div className="text-center space-y-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">Submit a Support Ticket</h2>
                                        <p className="text-gray-600">
                                            Open a ticket in our support portal and our team will assist you promptly.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Track your support requests in one place</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Get updates via email notifications</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Access our knowledge base and resources</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Attach files and screenshots to your tickets</p>
                                    </div>
                                </div>

                                <a
                                    href="https://z-academy.atlassian.net/servicedesk/customer/portal/1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                                >
                                    Open Support Portal
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    You'll be redirected to our secure support portal
                                </p>
                            </div>

                            {/* FAQ Section */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Frequently Asked Questions
                                    </h2>
                                    <p className="text-gray-600">
                                        Quick answers to common questions
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                            <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Support;