// src/components/home/FAQ.jsx

import { useState } from 'react';

const faqs = [
    {
        question: 'როგორ დავიწყო მენტორთან მუშაობა?',
        answer: 'პირველ რიგში უნდა დარეგისტრირდე ჩვენს პლატფორმაზე, შეავსო პროფილი და აირჩიო შენთვის სასურველი მიმართულება. შემდეგ ჩვენი ალგორითმი შემოგთავაზებს შესაფერის მენტორებს, რომლებთანაც შეძლებ პირველი უფასო კონსულტაციის გავლას.'
    },
    {
        question: 'რამდენი ჯდება მენტორთან მუშაობა?',
        answer: 'ჩვენთან არის სხვადასხვა საფასო პაკეტი. საწყისი პაკეტი იწყება 200 ლარიდან თვეში, რომელიც მოიცავს ორ 1-საათიან სესიას. პროფესიონალური პაკეტი ღირს 400 ლარი თვეში და მოიცავს ოთხ სესიას და 24/7 მხარდაჭერას.'
    },
    {
        question: 'რა გამოცდილება აქვთ მენტორებს?',
        answer: 'ჩვენი ყველა მენტორი არის აქტიური პროფესიონალი თავის სფეროში, მინიმუმ 10 წლიანი გამოცდილებით. მათ გაივლეს ჩვენი მკაცრი შერჩევის პროცესი და რეგულარულად გადიან ტრენინგებს.'
    },
    {
        question: 'შემიძლია მენტორის შეცვლა?',
        answer: 'დიახ, აბსოლუტურად. თუ რაიმე მიზეზით არ გიმუშავებს არჩეული მენტორი, შეგიძლია ნებისმიერ დროს შეცვალო. ჩვენი მიზანია შენი კმაყოფილება და წარმატება.'
    },
    {
        question: 'რა მიმართულებით შემიძლია განვვითრდე?',
        answer: 'ჩვენთან შეგიძლია იპოვო მენტორი სხვადასხვა სფეროში: ტექნოლოგიები, დიზაინი, მარკეტინგი, ბიზნესი, ფინანსები, კარიერული განვითარება და სხვა. თითოეულ მიმართულებაში გვყავს რამდენიმე გამოცდილი მენტორი.'
    },
    {
        question: 'როგორია სესიების ფორმატი?',
        answer: 'სესიები ტარდება ონლაინ რეჟიმში ვიდეო ზარის საშუალებით. თითოეული სესია გრძელდება 1 საათი და შეგიძლია წინასწარ შეათანხმო მენტორთან შენთვის მოსახერხებელი დრო. ასევე შეგიძლია მიიღო წერილობითი კონსულტაცია ჩატის საშუალებით.'
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="px-8 py-32 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb-4 text-primary">ხშირად დასმული კითხვები</h2>
                    <p className="text-xl text-gray-600">
                        იპოვე პასუხები ყველაზე გავრცელებულ შეკითხვებზე
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                            <button
                                className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-xl text-primary text-left">{faq.question}</span>
                                {openIndex === index ? (
                                    <svg className="text-secondary flex-shrink-0" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                ) : (
                                    <svg className="text-secondary flex-shrink-0" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-8 py-6 bg-gray-50 border-t-2 border-gray-200">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
