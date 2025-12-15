// src/components/home/WhyDifferent.jsx

import { motion } from 'framer-motion';

const differences = [
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'პერსონალიზებული მიდგომა',
        description: 'თითოეული სტუდენტი იღებს ინდივიდუალურ მიდგომას და მორგებულ სასწავლო გეგმას.'
    },
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'გამოცდილი პროფესიონალები',
        description: 'ჩვენი მენტორები არიან აქტიური სპეციალისტები წამყვან კომპანიებში.'
    },
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: 'დადასტურებული შედეგები',
        description: 'ჩვენი სტუდენტების 95% აღწევს თავის კარიერულ მიზნებს 6 თვეში.'
    },
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        title: 'კარიერული წინსვლა',
        description: 'დაგეხმარებით არა მხოლოდ სწავლაში, არამედ რეალურ კარიერულ შესაძლებლობებში.'
    },
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'უსაფრთხო გარემო',
        description: 'შენი პირადი ინფორმაცია და განვითარების გეგმა დაცულია.'
    },
    {
        icon: (
            <svg className="text-white" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'სწრაფი რეაგირება',
        description: 'მიიღე პასუხი შენს კითხვებზე 24 საათში.'
    }
];

const WhyDifferent = () => {
    // Animation variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // PowerPoint-style float in animation for each card
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Animation for heading
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
        <section className="px-8 py-32 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headingVariants}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-primary break-words">რა გვაქცევს განსხვავებულებად?</h2>
                    <p className="text-lg sm:text-xl text-gray-600 break-words">
                        ჩვენ არ ვართ უბრალო სასწავლო პლატფორმა - ჩვენ ვქმნით მომავალს
                    </p>
                </motion.div>
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {differences.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-8 bg-white rounded-2xl border-2 border-gray-200 hover:shadow-xl transition-shadow"
                            variants={cardVariants}
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${index % 3 === 1 ? 'bg-secondary' : 'bg-primary'}`}
                            >
                                {item.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl mb-3 text-primary break-words">{item.title}</h3>
                            <p className="text-gray-600 break-words">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyDifferent;
