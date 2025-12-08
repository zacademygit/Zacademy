// src/components/home/Testimonials.jsx

const testimonials = [
    {
        name: 'ნინო ბერიძე',
        role: 'აღმასრულებელი დირექტორი, TechStart Inc.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        content: 'ამ გუნდთან მუშაობა იყო აბსოლუტური თამაშის შემცვლელი ჩვენი ბიზნესისთვის. მათ მიაწოდეს ჩვენი მოლოდინის მიღმა და უზრუნველყვეს განსაკუთრებული მხარდაჭერა მთელი პროცესის განმავლობაში.',
        rating: 5
    },
    {
        name: 'გიორგი ჩიტაძე',
        role: 'დამფუძნებელი, Creative Labs',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        content: 'დეტალებზე ყურადღება და შემოქმედებითი გადაწყვეტილებები, რაც მათ მიაწოდეს იყო გამორჩეული. ჩვენმა ახალმა ვებსაიტმა მნიშვნელოვნად გააუმჯობესა ჩვენი კონვერტაციის მაჩვენებლები.',
        rating: 5
    },
    {
        name: 'ანა მამულაშვილი',
        role: 'მარკეტინგის დირექტორი, Global Ventures',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        content: 'პროფესიონალური, რესპონსიული და წარმოუდგენლად ნიჭიერი. მათ სრულყოფილად გაიგეს ჩვენი ხედვა და გაცოცხლდა იმ გზით, რასაც ვერ წარმოვიდგენდით.',
        rating: 5
    },
    {
        name: 'დავით ნაცვლიშვილი',
        role: 'მფლობელი, Local Business Co.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        content: 'როგორც მცირე ბიზნესის მფლობელი, დავაფასე მათი მოთმინება და სურვილი გამაგება პროცესის განმავლობაში. შედეგები თავისთავს საუბრობს.',
        rating: 5
    },
    {
        name: 'ლიზა გელაშვილი',
        role: 'ოპერაციების ვიცე-პრეზიდენტი, Enterprise Solutions',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
        content: 'მათი ექსპერტიზა როგორც დიზაინში, ასევე განვითარებაში არის ბერკეტი. მიაწოდეს მასშტაბირებადი გადაწყვეტა, რომელიც იზრდება ჩვენს ბიზნესთან ერთად.',
        rating: 5
    },
    {
        name: 'ლევან ქავთარაძე',
        role: 'სტარტაპის დამფუძნებელი',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        content: 'კონცეფციიდან გაშვებამდე, ისინი იყვნენ ჩვენთან ყოველი ნაბიჯზე. მათი სტრატეგიული შეხედულებები დაგვეხმარა სრულყოფილად განვათავსოთ ჩვენი პროდუქტი ბაზარზე.',
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="px-8 py-32 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb-4 text-[#1F3A8A]">რას ამბობენ ჩვენი კლიენტები</h2>
                    <p className="text-xl text-gray-600">
                        ნუ მიიღებთ მხოლოდ ჩვენს სიტყვას - მოისმინეთ ჩვენი კმაყოფილი კლიენტებისგან
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-2 border-gray-200">
                            <svg
                                className="mb-4"
                                style={{ color: index % 4 === 0 ? '#FA8AFF' : '#1F3A8A' }}
                                width="32"
                                height="32"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="fill-current"
                                        style={{ color: '#FA8AFF' }}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6">{testimonial.content}</p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-[#1F3A8A]">{testimonial.name}</div>
                                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
