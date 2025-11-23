// src/pages/FAQ.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqCategories = [
        {
            title: "General Questions",
            questions: [
                {
                    question: "What is Z-Academy?",
                    answer: "Z-Academy is a premier mentorship platform connecting students with experienced mentors from top universities and companies worldwide. We help students navigate university applications, career planning, and academic success through personalized one-on-one guidance."
                },
                {
                    question: "How does Z-Academy work?",
                    answer: "Students browse our verified mentors, book sessions based on their needs, and receive personalized guidance via video calls. Mentors set their own schedules and rates, while we handle all the logistics, payments, and technical infrastructure."
                },
                {
                    question: "Who can join Z-Academy?",
                    answer: "Students: Anyone seeking guidance for university applications, career development, or academic success. Mentors: Professionals, academics, and experts with proven track records in their fields and relevant credentials."
                }
            ]
        },
        {
            title: "For Students",
            questions: [
                {
                    question: "How much does it cost to use Z-Academy?",
                    answer: "Joining Z-Academy is free for students. You only pay for the mentoring sessions you book. Rates vary by mentor, typically ranging from $50-$500 per hour based on their expertise and experience."
                },
                {
                    question: "How do I find the right mentor?",
                    answer: "Use our advanced search filters to find mentors by university, field of study, career path, language, and price range. Read reviews from other students and book a consultation to ensure the right fit."
                },
                {
                    question: "What if I'm not satisfied with a session?",
                    answer: "We have a satisfaction guarantee. If you're not happy with your session, contact our support team within 48 hours. We'll review your case and may offer a refund or credit for future sessions."
                },
                {
                    question: "Can I reschedule or cancel a booking?",
                    answer: "Yes, you can reschedule or cancel up to 24 hours before your session without penalty. Cancellations within 24 hours may incur a fee, except in emergency circumstances."
                }
            ]
        },
        {
            title: "For Mentors",
            questions: [
                {
                    question: "How do I become a mentor on Z-Academy?",
                    answer: "Apply through our mentor application page. We review applications within 48 hours, looking for relevant expertise, credentials, and communication skills. Once approved, complete our onboarding process and start accepting students."
                },
                {
                    question: "How much can I earn as a mentor?",
                    answer: "You set your own rates, typically $50-$500 per hour. Top mentors earn over $10,000 monthly working part-time. Your earnings depend on your expertise, reputation, and availability."
                },
                {
                    question: "What support does Z-Academy provide to mentors?",
                    answer: "We provide training resources, marketing support, scheduling tools, secure payment processing, and a dedicated mentor success team. We also handle all technical infrastructure and student acquisition."
                },
                {
                    question: "Do I need teaching experience?",
                    answer: "While teaching experience is beneficial, it's not required. We look for subject matter expertise, professional achievements, and strong communication skills. We provide training to help you become an effective mentor."
                }
            ]
        },
        {
            title: "Payments & Billing",
            questions: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, debit cards, and PayPal. For institutional clients, we also offer invoicing and bank transfers."
                },
                {
                    question: "When are mentors paid?",
                    answer: "Mentors are paid weekly via direct deposit or PayPal. Payments are processed every Monday for sessions completed the previous week."
                },
                {
                    question: "Are there any hidden fees?",
                    answer: "No hidden fees for students. The price you see is what you pay. For mentors, Z-Academy takes a 20% platform fee from each session to cover operations, marketing, and support."
                },
                {
                    question: "Can I get a refund?",
                    answer: "Refunds are available for cancelled sessions (24+ hours notice) and unsatisfactory sessions (within our satisfaction guarantee terms). Contact support for assistance."
                }
            ]
        },
        {
            title: "Technical & Safety",
            questions: [
                {
                    question: "How are video sessions conducted?",
                    answer: "Sessions are conducted through our integrated video platform. No additional software needed - everything works in your browser. We provide screen sharing, whiteboard tools, and recording options (with consent)."
                },
                {
                    question: "Is my information safe?",
                    answer: "Yes, we use industry-standard encryption for all data. Payment information is processed securely through Stripe. We never share personal information without explicit consent."
                },
                {
                    question: "What if I have technical issues during a session?",
                    answer: "Our support team is available during all sessions. If technical issues prevent a session, we'll help reschedule at no cost. We also provide technical checks before sessions."
                },
                {
                    question: "Are mentors verified?",
                    answer: "Yes, all mentors go through a rigorous verification process including credential checks, background screening, and interview assessment before being approved on the platform."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl text-gray-600">
                            Everything you need to know about Z-Academy
                        </p>
                    </div>
                </div>
            </section>

            {/* Main FAQ Content */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        {faqCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-12">
                                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                                <div className="space-y-4">
                                    {category.questions.map((item, index) => {
                                        const itemKey = `${categoryIndex}-${index}`;
                                        return (
                                            <div
                                                key={index}
                                                className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                                            >
                                                <button
                                                    onClick={() => toggleItem(itemKey)}
                                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                                                >
                                                    <h3 className="font-semibold text-gray-900">{item.question}</h3>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transition-transform ${openItems[itemKey] ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                {openItems[itemKey] && (
                                                    <div className="px-6 pb-4">
                                                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Still have questions section */}
                        <div className="mt-20 bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                            <p className="text-lg mb-8 text-purple-100">
                                Can't find what you're looking for? Our support team is here to help.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    to="/contact"
                                    className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                                >
                                    Contact Support
                                </Link>
                                <Link
                                    to="/guides"
                                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                                >
                                    Browse Guides
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FAQ;