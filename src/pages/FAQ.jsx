// src/pages/FAQ.jsx

import { Plus, Minus, HelpCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const faqCategories = [
    {
        category: 'ზოგადი ინფორმაცია',
        icon: HelpCircle,
        questions: [
            {
                question: 'რას წარმოადგენს ჩვენი პლატფორმა?',
                answer: 'ჩვენი პლატფორმა არის მენტორშიპის სერვისი, რომელიც აკავშირებს სტუდენტებსა და პროფესიონალებს. ჩვენი მიზანია დაგეხმაროთ კარიერული და პროფესიული განვითარებაში გამოცდილი მენტორების დახმარებით.'
            },
            {
                question: 'ვის შეუძლია გამოიყენოს პლატფორმა?',
                answer: 'პლატფორმა ღიაა ყველასთვის, ვინც სურს პროფესიულად განვითარდეს - სტუდენტებისთვის, ახალგაზრდა სპეციალისტებისთვის და კარიერის შემცვლელებისთვის. ასევე, პროფესიონალებს შეუძლიათ გახდნენ მენტორები და გაუზიარონ თავიანთი ცოდნა.'
            },
            {
                question: 'რა უპირატესობები მაქვს პლატფორმის გამოყენებით?',
                answer: 'პლატფორმა გთავაზობთ პერსონალიზებულ მიდგომას, გამოცდილ მენტორებს, მოქნილ გრაფიკს, რეალურ პროექტებზე მუშაობის შესაძლებლობას და კომუნიტეტის მხარდაჭერას. ასევე, პირველი კონსულტაცია მთლიანად უფასოა.'
            }
        ]
    },
    {
        category: 'მენტორთან მუშაობა',
        icon: HelpCircle,
        questions: [
            {
                question: 'როგორ დავიწყო მენტორთან მუშაობა?',
                answer: 'პირველ რიგში უნდა დარეგისტრირდე ჩვენს პლატფორმაზე, შეავსო პროფილი და აირჩიო შენთვის სასურველი მიმართულება. შემდეგ ჩვენი ალგორითმი შემოგთავაზებს შესაფერის მენტორებს, რომლებთანაც შეძლებ პირველი უფასო კონსულტაციის გავლას.'
            },
            {
                question: 'როგორ ვირჩევ შესაფერის მენტორს?',
                answer: 'პლატფორმაზე შეგიძლია გაფილტრო მენტორები სპეციალობის, გამოცდილების, რეიტინგის და ხელმისაწვდომობის მიხედვით. ასევე, შეგიძლია წაიკითხო მათი პროფილები, მიმოხილვები და ნახო, რა პროექტებზე მუშაობდნენ. რეკომენდებულია, პირველი უფასო კონსულტაცია გაიარო რამდენიმე მენტორთან, რომ აირჩიო შენთვის ყველაზე შესაფერისი.'
            },
            {
                question: 'შემიძლია მენტორის შეცვლა?',
                answer: 'დიახ, აბსოლუტურად. თუ რაიმე მიზეზით არ გიმუშავებს არჩეული მენტორი, შეგიძლია ნებისმიერ დროს შეცვალო. ჩვენი მიზანია შენი კმაყოფილება და წარმატება.'
            },
            {
                question: 'რა გამოცდილება აქვთ მენტორებს?',
                answer: 'ჩვენი ყველა მენტორი არის აქტიური პროფესიონალი თავის სფეროში, მინიმუმ 5 წლიანი გამოცდილებით. უმეტესობას აქვს 10+ წლიანი გამოცდილება. მათ გაივლეს ჩვენი მკაცრი შერჩევის პროცესი და რეგულარულად გადიან ტრენინგებს.'
            }
        ]
    },
    {
        category: 'სესიები და ფორმატი',
        icon: HelpCircle,
        questions: [
            {
                question: 'როგორია სესიების ფორმატი?',
                answer: 'სესიები ტარდება ონლაინ რეჟიმში ვიდეო ზარის საშუალებით. თითოეული სესია გრძელდება 1 საათი და შეგიძლია წინასწარ შეათანხმო მენტორთან შენთვის მოსახერხებელი დრო. ასევე შეგიძლია მიიღო წერილობითი კონსულტაცია ჩატის საშუალებით.'
            },
            {
                question: 'რა პლატფორმას იყენებთ ვიდეო სესიებისთვის?',
                answer: 'ვიდეო სესიები ტარდება ჩვენი ინტეგრირებული ვიდეო პლატფორმის საშუალებით, რომელიც მოიცავს screen sharing-ს, whiteboard-ს და ფაილების გაზიარების შესაძლებლობას. ასევე შეგიძლია გამოიყენო Zoom ან Google Meet, თუ მენტორთან ასე შეთანხმდები.'
            },
            {
                question: 'რამდენი დრო გრძელდება სესია?',
                answer: 'სტანდარტული სესია გრძელდება 1 საათს. თუმცა, შეგიძლია შეათანხმო მენტორთან 30 წუთიანი ან 90 წუთიანი სესიებიც, შენი საჭიროებების მიხედვით.'
            },
            {
                question: 'რა ხდება თუ სესია გავტოვე?',
                answer: 'თუ წინასწარ, მინიმუმ 24 საათით ადრე გააუქმე სესია, შეგიძლია გადაიტანო სხვა დროზე. თუ სესიას ვერ დაესწარი გაფრთხილების გარეშე, იგი ჩაითვლება გამოყენებულად.'
            }
        ]
    },
    {
        category: 'ფასები და გადახდა',
        icon: HelpCircle,
        questions: [
            {
                question: 'რამდენი ჯდება მენტორთან მუშაობა?',
                answer: 'ჩვენთან არის სხვადასხვა საფასო პაკეტი. საწყისი პაკეტი იწყება 200 ლარიდან თვეში, რომელიც მოიცავს ორ 1-საათიან სესიას. პროფესიონალური პაკეტი ღირს 400 ლარი თვეში და მოიცავს ოთხ სესიას და 24/7 მხარდაჭერას. ასევე არის ინდივიდუალური პაკეტები.'
            },
            {
                question: 'არის თუ არა უფასო კონსულტაცია?',
                answer: 'დიახ! ყველა ახალ სტუდენტს აქვს უფლება მიიღოს 30 წუთიანი უფასო კონსულტაცია ნებისმიერ მენტორთან. ეს დაგეხმარება გაიგო, შეესაბამება თუ არა მენტორი შენს მოლოდინებს.'
            },
            {
                question: 'რა გადახდის მეთოდებს იღებთ?',
                answer: 'ვიღებთ ბარათით გადახდას (Visa, Mastercard), საბანკო გადარიცხვას და TBC Pay-ს. ყველა გადახდა დაცულია და გადის დაშიფრული არხებით.'
            },
            {
                question: 'არის თუ არა გადახდის დაბრუნება?',
                answer: 'თუ პირველი სესიის შემდეგ არ დარჩი კმაყოფილი, შეგიძლია მოითხოვო სრული თანხის დაბრუნება 7 დღის განმავლობაში. დანარჩენ შემთხვევებში, გამოუყენებელი სესიების ღირებულება უბრუნდება თქვენს ანგარიშს.'
            }
        ]
    },
    {
        category: 'მიმართულებები და სპეციალობები',
        icon: HelpCircle,
        questions: [
            {
                question: 'რა მიმართულებით შემიძლია განვვითრდე?',
                answer: 'ჩვენთან შეგიძლია იპოვო მენტორი სხვადასხვა სფეროში: ტექნოლოგიები და IT, დიზაინი და კრეატივი, მარკეტინგი და გაყიდვები, ბიზნესი და მენეჯმენტი, ფინანსები და ბუღალტერია, კარიერული განვითარება და სხვა. თითოეულ მიმართულებაში გვყავს რამდენიმე გამოცდილი მენტორი.'
            },
            {
                question: 'შემიძლია რამდენიმე მიმართულებით ერთდროულად მუშაობა?',
                answer: 'დიახ, შეგიძლია იყო რამდენიმე მენტორის სტუდენტი სხვადასხვა მიმართულებით. მაგალითად, შეიძლება იმუშაო IT მენტორთან და პარალელურად კარიერულ მენტორთან.'
            },
            {
                question: 'რა ენებზე ხდება მენტორინგი?',
                answer: 'უმეტესი სესიები ტარდება ქართულ ენაზე. თუმცა, გვყავს ინგლისურენოვანი მენტორებიც და ზოგიერთ სფეროში შესაძლებელია რუსულენოვანი კონსულტაციაც.'
            }
        ]
    },
    {
        category: 'ტექნიკური საკითხები',
        icon: HelpCircle,
        questions: [
            {
                question: 'რა ტექნიკური მოთხოვნებია საჭირო?',
                answer: 'საჭიროა კომპიუტერი ან ტაბლეტი სტაბილური ინტერნეტით, ვებკამერა და მიკროფონი. რეკომენდებულია ყურსასმენები უკეთესი ხმის ხარისხისთვის.'
            },
            {
                question: 'როგორ დავარეგისტრირდე პლატფორმაზე?',
                answer: 'დააჭირე "შესვლა" ღილაკს, შემდეგ "როგორც სტუდენტი" და შეავსე რეგისტრაციის ფორმა შენი ელ-ფოსტით. დადასტურების მეილის მიღების შემდეგ შეძლებ დაასრულო პროფილის შევსება.'
            },
            {
                question: 'უსაფრთხოა ჩემი პირადი ინფორმაცია?',
                answer: 'დიახ, ჩვენ გამოვიყენებთ ინდუსტრიის სტანდარტულ დაშიფვრას და უსაფრთხოების პროტოკოლებს. თქვენი პირადი მონაცემები არასოდეს გაზიარდება მესამე მხარეებთან თქვენი თანხმობის გარეშე.'
            }
        ]
    },
    {
        category: 'მენტორად გახდომა',
        icon: HelpCircle,
        questions: [
            {
                question: 'როგორ შემიძლია მენტორად გახდომა?',
                answer: 'დააჭირე "შესვლა" ღილაკს და აირჩიე "როგორც მენტორი". შეავსე განაცხადი შენი გამოცდილებისა და კვალიფიკაციის შესახებ. ჩვენი გუნდი განიხილავს განაცხადს 3-5 სამუშაო დღეში.'
            },
            {
                question: 'რა მოთხოვნებია მენტორებისთვის?',
                answer: 'მენტორებს უნდა ჰქონდეთ მინიმუმ 5 წლიანი პროფესიული გამოცდილება თავიანთ სფეროში, აქტიური იყვნენ ინდუსტრიაში და ჰქონდეთ სურვილი გაუზიარონ თავიანთი ცოდნა სხვებს.'
            },
            {
                question: 'რამდენს ვიშოვი მენტორად?',
                answer: 'მენტორები თვითონ განსაზღვრავენ ფასებს თავიანთი სესიებისთვის. პლატფორმა იღებს 20% კომისიას თითოეული სესიიდან. საშუალო მენტორი იღებს 150-300 ლარს საათში.'
            }
        ]
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        if (openIndex === key) {
            setOpenIndex(null);
        } else {
            setOpenIndex(key);
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
        <div className="min-h-screen bg-white">
            {/* Hero Section with Grid Pattern */}
            <section className="relative px-8 py-24 bg-white overflow-hidden">
                <div
                    className="absolute bg-primary z-0"
                    style={{
                        left: '0',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '400px',
                        backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat'
                    }}
                ></div>

                <motion.div
                    className="max-w-4xl mx-auto relative z-10 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    <h1 className="text-5xl text-white mb-6">ხშირად დასმული კითხვები</h1>
                    <p className="text-xl text-white/80">
                        იპოვე პასუხები ყველაზე გავრცელებულ შეკითხვებზე ჩვენი პლატფორმისა და სერვისების შესახებ
                    </p>
                </motion.div>
            </section>

            {/* FAQ Categories */}
            <section className="px-8 py-24 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-12">
                        {faqCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <div className="mb-8">
                                    <h2 className="text-3xl  mb-2">{category.category}</h2>
                                    <div className="w-20 h-1 bg-secondary"></div>
                                </div>

                                <div className="space-y-4">
                                    {category.questions.map((faq, questionIndex) => {
                                        const key = `${categoryIndex}-${questionIndex}`;
                                        return (
                                            <div key={questionIndex} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-secondary/30 transition-colors">
                                                <button
                                                    className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                                    onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                                >
                                                    <span className="text-lg  text-left">{faq.question}</span>
                                                    {openIndex === key ? (
                                                        <Minus className="text-secondary flex-shrink-0" size={24} />
                                                    ) : (
                                                        <Plus className="text-secondary flex-shrink-0" size={24} />
                                                    )}
                                                </button>
                                                {openIndex === key && (
                                                    <div className="px-8 py-6 bg-gray-50 border-t-2 border-gray-200">
                                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support Section */}
            <section className="px-8 py-24 bg-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <Mail className="mx-auto text-secondary mb-6" size={48} />
                    <h2 className="text-4xl text-white mb-4">ვერ იპოვე პასუხი?</h2>
                    <p className="text-xl text-white/80 mb-8">
                        ჩვენი გუნდი მზადაა დაგეხმაროს ნებისმიერ კითხვაში
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-secondary text-white rounded-full hover:opacity-90 transition-opacity">
                            დაგვიკავშირდი
                        </button>
                        <button className="px-8 py-4 bg-white  rounded-full hover:bg-white/90 transition-colors">
                            ელ-ფოსტის გაგზავნა
                        </button>
                    </div>
                    <p className="text-white/60 mt-6">
                        საშუალო პასუხის დრო: 2-4 საათი
                    </p>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
