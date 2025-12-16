// src/components/home/TopMentors.jsx

const mentors = [
    {
        name: 'გიორგი მელაძე',
        title: 'ტექნოლოგიური დირექტორი',
        company: 'Tech Innovation',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        rating: 4.9,
        students: 150,
        expertise: ['ტექნოლოგიები', 'სტარტაპი', 'ლიდერობა'],
        experience: '15+ წელი'
    },
    {
        name: 'ნინო წულუკიძე',
        title: 'მარკეტინგის სტრატეგი',
        company: 'Creative Agency',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        rating: 5.0,
        students: 200,
        expertise: ['მარკეტინგი', 'ბრენდინგი', 'სტრატეგია'],
        experience: '12+ წელი'
    },
    {
        name: 'დავით კაპანაძე',
        title: 'UX/UI დიზაინერი',
        company: 'Design Studio',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        rating: 4.8,
        students: 120,
        expertise: ['დიზაინი', 'UX', 'პროდუქტი'],
        experience: '10+ წელი'
    },
    {
        name: 'ანა ბერიძე',
        title: 'ფინანსური კონსულტანტი',
        company: 'Finance Group',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        rating: 4.9,
        students: 180,
        expertise: ['ფინანსები', 'ინვესტიცია', 'ბიზნესი'],
        experience: '18+ წელი'
    }
];

const TopMentors = () => {
    return (
        <section className="bg-white px-8 py-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb-4 ">ჩვენი საუკეთესო მენტორები</h2>
                    <p className="text-xl text-gray-600">
                        გაეცანი პროფესიონალებს, რომლებიც დაგეხმარებიან შენს წარმატებაში
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl transition-shadow flex flex-col">
                            <div className="relative mb-4">
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1 bg-secondary">
                                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    {mentor.rating}
                                </div>
                            </div>
                            <h3 className="text-xl mb-1  text-center">{mentor.name}</h3>
                            <p className="text-gray-600 text-center mb-1">{mentor.title}</p>
                            <p className="text-sm text-gray-500 text-center mb-4">{mentor.company}</p>

                            <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {mentor.students}
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    {mentor.experience}
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition-opacity mt-auto">
                                ნახე პროფილი
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopMentors;
