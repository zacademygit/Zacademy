// src/components/home/FAQ.jsx

import { useState } from 'react';

const faqs = [
    {
        question: 'რას ნიშნავს 1:1 მენტორშიფი?',
        answer: 'ეს არის ინდივიდუალური ვიდეო ზარი შენსა და არჩეულ მენტორს შორის. არანაირი ჯგუფური ლექცია ან ჩაწერილი ვიდეო — მთელი დრო ეთმობა მხოლოდ შენს კითხვებსა და კარიერულ მიზნებს.'
    },
    {
        question: 'როგორ შევარჩიო ჩემთვის სწორი მენტორი?',
        answer: 'გამოიყენე ჩვენი ფილტრები: მიუთითე სასურველი სფერო (მაგ: მარკეტინგი, IT, დიზაინი). ასევე, შეგიძლია გადახედო მენტორის პროფილს, გამოცდილებას და სხვა მომხმარებლების შეფასებებს.'
    },
    {
        question: 'მე ზუსტად არ ვიცი რა ვკითხო მენტორს. ეს პრობლემაა?',
        answer: 'არანაირად! მენტორები მზად არიან დაგეხმარონ საუბრის წარმართვაში. შეგიძლია უბრალოდ მოუყვე შენს სიტუაციაზე და ისინი თავად მოგცემენ მიმართულებას ან დაგისვამენ სწორ კითხვებს. მაგრამ სესია უფრო წარმატებული იქნება თუ შენც მზად იქნები, ამაში კი ჩვენი Cheat Sheet დაგეხმარება.'
    },
    {
        question: 'ვინ არიან მენტორები?',
        answer: 'პლატფორმაზე ხვდებიან მხოლოდ პრაქტიკოსი პროფესიონალები, რომლებიც მუშაობენ ადგილობრივ და საერთაშორისო ტოპ კომპანიებში. ჩვენ არ ვიღებთ თეორიტიკოსებს — მხოლოდ მათ, ვისაც რეალური გამოცდილება აქვს.'
    },
    {
        question: 'რა მიმართულებით შემიძლია განვვითრდე?',
        answer: 'ჩვენთან შეგიძლია იპოვო მენტორი სხვადასხვა სფეროში: ტექნოლოგიები, დიზაინი, მარკეტინგი, ბიზნესი, ფინანსები, კარიერული განვითარება და სხვა. თითოეულ მიმართულებაში გვყავს რამდენიმე გამოცდილი მენტორი.'
    },
    {
        question: 'გავლილი აქვთ თუ არა მენტორებს შემოწმება (Verification)?',
        answer: 'დიახ. ყველა მენტორი გადის ვერიფიკაციის პროცესს. ჩვენ ვამოწმებთ მათ სამუშაო გამოცდილებას და კომპეტენციას, სანამ ისინი პლატფორმაზე გამოჩნდებიან.'
    },
    {
        question: 'სად ტარდება შეხვედრები?',
        answer: 'შეხვედრები ტარდება ონლაინ, ჩვენი პლატფორმის ინტეგრირებული ვიდეო-ზარის მეშვეობით (Google Meet ლინკით). ლინკს მიიღებ ავტომატურად, ჯავშნის დადასტურებისთანავე.'
    },
    {
        question: 'როგორ დავჯავშნო დრო',
        answer: 'მენტორის პროფილზე ნახავ „Live კალენდარს“, სადაც მონიშნულია თავისუფალი სლოტები. ირჩევ შენთვის მოსახერხებელ დროს და მარტივად ჯავშნი.'
    },
    {
        question: 'რა ხდება, თუ შეხვედრაზე ვერ ვესწრები?',
        answer: 'შეხვედრის გაუქმება ან გადატანა შესაძლებელია (კონკრეტული პირობა ჩავამატოთ). მეტი ინფორმაციისთვის გაეცანი მომსახურების პირობებს და დეტალებს.'
    },
    {
        question: 'არის თუ არა პლატფორმა უფასო? ',
        answer: 'პლატფორმაზე რეგისტრაცია და მენტორების დათვალიერება უფასოა. შენ იხდი მხოლოდ კონკრეტული სესიის საფასურს, რომელიც მითითებულია თითოეული მენტორის პროფილზე.'
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="px-8 py-32 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb-4 ">ხშირად დასმული კითხვები</h2>
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
                                <span className="text-xl  text-left">{faq.question}</span>
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
