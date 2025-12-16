// src/pages/Support.jsx

import { Mail, Clock, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: 'როგორ დავჯავშნო მენტორინგ სესია?',
        answer: 'დაათვალიერე ჩვენი მენტორების პროფილები, აირჩიე მენტორი რომელიც შეესაბამება შენს საჭიროებებს და დააჭირე ხელმისაწვდომ დროს რომ დაჯავშნო სესია.'
    },
    {
        question: 'რა მოხდება თუ მჭირდება სესიის გაუქმება?',
        answer: 'შეგიძლია გააუქმო სესია 24 საათით ადრე დაჯავშნის დაშბორდიდან და დაბრუნდება გადახდა ყოველგვარი პირგასამტეხლოების გარეშე.'
    },
    {
        question: 'როგორ გავხდე მენტორი?',
        answer: 'ეწვიე "გახდი მენტორი" გვერდს, შეავსე განაცხადის ფორმა და ჩვენი გუნდი განიხილავს შენს პროფილს 3-5 სამუშაო დღის განმავლობაში.'
    },
    {
        question: 'დაცულია თუ არა ჩემი გადახდის ინფორმაცია?',
        answer: 'დიახ, ჩვენ ვიყენებთ ინდუსტრიის სტანდარტულ დაშიფვრას და უსაფრთხო გადახდის დამუშავებას თქვენი ფინანსური ინფორმაციის დასაცავად.'
    },
    {
        question: 'შემიძლია თუ არა დაბრუნება მოვითხოვო?',
        answer: 'დიახ, თუ არ ხარ კმაყოფილი მინიმუმ 48 საათით ადრე გაუქმებულ სესიაზე, გთხოვთ დაუკავშირდი მხარდაჭერას დახმარებისთვის.'
    }
];

const Support = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
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
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="px-8 py-16 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    <h1 className="text-5xl mb-4 text-gray-900">
                        როგორ შეგვიძლია <span className="text-secondary">დაგეხმაროთ?</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        დაუკავშირდი ჩვენს მხარდაჭერის გუნდს. ჩვენ აქ ვართ, რომ დაგეხმაროთ წარმატებაში.
                    </p>
                </motion.div>
            </section>

            {/* Contact Cards */}
            <section className="px-8 py-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Support Card */}
                    <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary transition-colors">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                            <Mail className="text-secondary" size={24} />
                        </div>
                        <h3 className="text-xl mb-2 text-gray-900">ელ-ფოსტის მხარდაჭერა</h3>
                        <p className="text-gray-600 mb-4">მოგვწერე ნებისმიერ დროს</p>
                        <a href="mailto:support@academy.ge" className=" hover:text-secondary transition-colors">
                            support@academy.ge
                        </a>
                    </div>

                    {/* Response Time Card */}
                    <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Clock className="" size={24} />
                        </div>
                        <h3 className="text-xl mb-2 text-gray-900">პასუხის დრო</h3>
                        <p className="text-gray-600 mb-4">ჩვეულებრივ ვპასუხობთ შემდეგში</p>
                        <p className="text-2xl ">24 საათი</p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="px-8 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Submit Support Ticket Card */}
                    <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                            <FileText className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl mb-4 ">მხარდაჭერის ბილეთის გაგზავნა</h2>
                        <p className="text-gray-700 mb-6">
                            გახსენი ბილეთი ჩვენს მხარდაჭერის პორტალში და ჩვენი გუნდი დაგეხმარება შენს პრობლემაში.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-secondary mt-1">✓</span>
                                <span>თვალყური ადევნე შენს მხარდაჭერის მოთხოვნებს ერთ ადგილას</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-secondary mt-1">✓</span>
                                <span>მიიღე განახლებები მეილით და შეტყობინებებით</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-secondary mt-1">✓</span>
                                <span>წვდომა ცოდნის ბაზაზე და რესურსებზე</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-secondary mt-1">✓</span>
                                <span>დაათვალიერე წინა ბილეთების ისტორია და ეკრანზე გადაღებული სურათები</span>
                            </li>
                        </ul>
                        <button className="w-full bg-secondary text-white py-4 rounded-xl hover:opacity-90 transition-opacity">
                            გახსენი მხარდაჭერის ბილეთი
                        </button>
                        <p className="text-sm text-gray-500 mt-4 text-center">
                            შენ უნდა იყო რეგისტრირებული რომ გამოიყენო მხარდაჭერის პორტალი
                        </p>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-2xl mb-6 text-gray-900 text-center">ხშირად დასმული კითხვები</h2>
                        <p className="text-gray-600 mb-6 text-center">დააჭირე კითხვას რომ იხილო პასუხი</p>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary transition-colors"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-gray-900 pr-4">{faq.question}</span>
                                        <ChevronDown
                                            size={20}
                                            className={` flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                                            <p className="text-gray-700">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Support;
