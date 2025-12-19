// src/components/home/Hero.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const Hero = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [selectedOccupation, setSelectedOccupation] = useState('');

    // Animation variant for entire content to fade in together
    const headingVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const handleSearch = () => {
        if (selectedOccupation) {
            navigate(`/mentors?occupationArea=${encodeURIComponent(selectedOccupation)}`);
        } else {
            navigate('/mentors');
        }
    };

    return (
        <section id="home" className="relative px-8 py-32 bg-white overflow-hidden">
            {/* Decorative Background Shape with Grid Pattern */}
            <div
                className="absolute bg-primary z-0"
                style={{
                    left: '0',
                    right: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '645px',
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                }}
            ></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headingVariants}
                >
                    <h1 className="text-6xl mb-6 text-white">
                        {language === 'en' ? 'Find your mentor' : 'იპოვე შენი მენტორი'}
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        {language === 'en' ? 'Connect with professionals and achieve your career goalsr' : '1-1 სესიები ტოპ პროფესიონალებთან'}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-full p-2 flex gap-2 shadow-lg">
                        <select
                            value={selectedOccupation}
                            onChange={(e) => setSelectedOccupation(e.target.value)}
                            className="flex-1 min-w-0 px-3 sm:px-6 py-3 bg-transparent border-none outline-none text-gray-700"
                        >
                            <option value="" disabled>
                                {language === 'en' ? 'Choose your goal' : 'აირჩიე მიზანი'}
                            </option>
                            <option value="STEM (Science, Technology, Engineering, Mathematics)">
                                {language === 'en' ? 'STEM (Science, Technology, Engineering, Mathematics)' : 'STEM (მეცნიერება, ტექნოლოგია, ინჟინერია, მათემატიკა)'}
                            </option>
                            <option value="Business, Finance & Management">
                                {language === 'en' ? 'Business, Finance & Management' : 'ბიზნესი, ფინანსები, მენეჯმენტი'}
                            </option>
                            <option value="Creative Arts, Media & Design">
                                {language === 'en' ? 'Creative Arts, Media & Design' : 'კრეატიული ხელოვნება, მედია და დიზაინი'}
                            </option>
                            <option value="Healthcare & Medicine">
                                {language === 'en' ? 'Healthcare & Medicine' : 'ჯანდაცვა და მედიცინა'}
                            </option>
                            <option value="Education & Social Sciences">
                                {language === 'en' ? 'Education & Social Sciences' : 'განათლება და სოციალური მეცნიერებები'}
                            </option>
                            <option value="Law, Government & Public Policy">
                                {language === 'en' ? 'Law, Government & Public Policy' : 'სამართალი, მმართველობა და საჯარო პოლიტიკა'}
                            </option>
                            <option value="Trades, Vocational & Technical Careers">
                                {language === 'en' ? 'Trades, Vocational & Technical Careers' : 'პროფესიული, საწარმოო და ტექნიკური სფეროები'}
                            </option>
                            <option value="Hospitality, Tourism & Customer Experience">
                                {language === 'en' ? 'Hospitality, Tourism & Customer Experience' : 'სტუმართმასპინძლობა, ტურიზმი და მომხმარებელთან ურთიერთობა'}
                            </option>
                            <option value="Environment, Agriculture & Sustainability">
                                {language === 'en' ? 'Environment, Agriculture & Sustainability' : 'გარემო, სოფლის მეურნეობა და მდგრადობა'}
                            </option>
                            <option value="Sports, Fitness & Wellness">
                                {language === 'en' ? 'Sports, Fitness & Wellness' : 'სპორტი, ფიტნესი და ველნესი'}
                            </option>
                            <option value="Emerging & Future-Forward Fields">
                                {language === 'en' ? 'Emerging & Future-Forward Fields' : 'ამომავალი და მომავლის სფეროები'}
                            </option>
                        </select>
                        <button
                            onClick={handleSearch}
                            className="flex-shrink-0 bg-accent px-4 sm:px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {language === 'en' ? 'Search' : 'ძიება'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
