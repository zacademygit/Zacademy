// src/components/home/TopMentors.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const TopMentors = () => {
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchTopMentors();
    }, []);

    const fetchTopMentors = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/mentors?limit=8`);
            if (response.data.success) {
                setMentors(response.data.mentors);
            }
        } catch (error) {
            console.error('Error fetching top mentors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < mentors.length - 4) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleMentorClick = (mentorId) => {
        navigate(`/mentor/${mentorId}`);
    };

    if (loading) {
        return (
            <section className="bg-white px-8 py-32">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            </section>
        );
    }
    return (
        <section className="bg-white px-8 py-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb-4">ჩვენი საუკეთესო მენტორები</h2>
                    <p className="text-xl text-gray-600">
                        გაეცანი პროფესიონალებს, რომლებიც დაგეხმარებიან შენს წარმატებაში
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border-2 border-gray-200 transition-all ${
                            currentIndex === 0
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50 hover:shadow-xl cursor-pointer'
                        }`}
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= mentors.length - 4}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border-2 border-gray-200 transition-all ${
                            currentIndex >= mentors.length - 4
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50 hover:shadow-xl cursor-pointer'
                        }`}
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-6"
                            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                        >
                            {mentors.map((mentor) => (
                                <div
                                    key={mentor.id}
                                    className="flex-shrink-0 w-[calc(25%-18px)] bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl transition-shadow flex flex-col"
                                >
                                    <div className="relative mb-4">
                                        {mentor.photoUrl ? (
                                            <img
                                                src={mentor.photoUrl}
                                                alt={mentor.name}
                                                className="w-full h-48 object-cover rounded-xl"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${mentor.firstName}+${mentor.lastName}&background=1F3A8A&color=fff&size=200`;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl mb-1 text-center">{mentor.name}</h3>
                                    <p className="text-gray-600 text-center mb-1">{mentor.currentPosition || 'Mentor'}</p>
                                    <p className="text-sm text-gray-500 text-center mb-4">{mentor.company || mentor.university}</p>

                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        {mentor.occupationArea && (
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs border border-primary/20">
                                                {mentor.occupationArea}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleMentorClick(mentor.id)}
                                        className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition-opacity mt-auto cursor-pointer"
                                    >
                                        ნახე პროფილი
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopMentors;
