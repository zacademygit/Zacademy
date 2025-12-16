// src/components/home/WhyUs.jsx

const reasons = [
    {
        title: 'ინდივიდუალური მიდგომა',
        description: 'მენტორები ქმნიან განვითარების ინდივიდუალურ გეგმას, რომელიც ზუსტად შენს უნიკალურ გეგმებზე და საჭიროებებზეა მორგებული.'
    },
    {
        title: 'მოქნილი გრაფიკი',
        description: 'შენი განრიგი-შენი წესები. დაჯავშნე და შეხვდი მენტორს შენთვის სასურველ დროს და სასურველი ადგილიდან.'
    },
    {
        title: 'ვერიფიცირებული მენტორები',
        description: 'პლატფორმაზე მოხვედრამდე თითოეული მენტორი გადის ვერიფიკაციის პროცესს, რაც უზრუნველყოფს ჩვენი პლატფორმის სანდოობას.'
    },
];

const WhyUs = () => {
    return (
        <section className="px-8 py-32 bg-primary">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-5xl mb-6 text-white">რატომ ჩვენ?</h2>
                        <p className="text-xl text-white/80 mb-8">
                            ჩვენ გვჯერა, რომ ყველას აქვს პოტენციალი წარმატებისთვის. ჩვენი მისიაა დაგეხმაროთ ამ პოტენციალის რეალიზებაში.                        </p>
                        <div className="space-y-6">
                            {reasons.map((reason, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <svg className="text-secondary" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl mb-2 text-white">{reason.title}</h3>
                                        <p className="text-white/70">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <div className="space-y-8">
                            <div className="text-center">
                                <div className="text-6xl mb-2 text-secondary">95%</div>
                                <p className="text-white/80">წარმატების მაჩვენებელი</p>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl mb-2 text-secondary">500+</div>
                                <p className="text-white/80">აქტიური სტუდენტი</p>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl mb-2 text-secondary">100+</div>
                                <p className="text-white/80">პროფესიონალი მენტორი</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
