// src/components/home/Hero.jsx

import { motion } from 'framer-motion';

const Hero = () => {
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
                        იპოვე შენი იდეალური მენტორი
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        დაუკავშირდი პროფესიონალებს და მიაღწიე შენს კარიერულ მიზნებს
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-full p-2 flex gap-2 shadow-lg">
                        <select className="flex-1 px-6 py-3 bg-transparent border-none outline-none text-gray-700">
                            <option>აირჩიე მიზანი</option>
                            <option>ბიზნესი და მენეჯმენტი</option>
                            <option>ტექნოლოგიები და IT</option>
                            <option>დიზაინი და კრეატივი</option>
                            <option>მარკეტინგი და გაყიდვები</option>
                            <option>ფინანსები და ბუღალტერია</option>
                            <option>კარიერული განვითარება</option>
                        </select>
                        <button
                            className="bg-secondary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            მოძებნე
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
