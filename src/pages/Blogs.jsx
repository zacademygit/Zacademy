// src/pages/Blogs.jsx

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const blogPosts = [
    {
        id: 1,
        title: 'როგორ ავირჩიოთ სწორი მენტორი კარიერული წინსვლისთვის',
        excerpt: 'მენტორის არჩევა მნიშვნელოვანი ნაბიჯია პროფესიულ განვითარებაში. განვიხილოთ რა კრიტერიუმებით უნდა ვიხელმძღვანელოთ.',
        author: 'ნინო გელაშვილი',
        date: '5 დეკემბერი, 2025',
        readTime: '5 წუთი',
        category: 'კარიერა',
        visualType: 'circles'
    },
    {
        id: 2,
        title: 'STEM განათლების მომავალი საქართველოში',
        excerpt: 'ტექნოლოგიური განვითარება სწრაფად ცვლის განათლების ლანდშაფტს. რა შესაძლებლობები გვხვდება STEM სფეროში.',
        author: 'გიორგი ბერიძე',
        date: '2 დეკემბერი, 2025',
        readTime: '7 წუთი',
        category: 'განათლება',
        visualType: 'squares'
    },
    {
        id: 3,
        title: 'ხელოვნური ინტელექტი და კრეატიული ინდუსტრიები',
        excerpt: 'AI ტექნოლოგიები ახალ შესაძლებლობებს ქმნიან დიზაინერებისა და მედია პროფესიონალებისთვის.',
        author: 'თამარ ხარაიშვილი',
        date: '28 ნოემბერი, 2025',
        readTime: '6 წუთი',
        category: 'ტექნოლოგია',
        visualType: 'lines'
    },
    {
        id: 4,
        title: 'ბიზნეს-განათლება: თეორია vs პრაქტიკა',
        excerpt: 'როგორ გავაერთიანოთ აკადემიური ცოდნა რეალურ ბიზნეს გამოცდილებასთან მენტორშიპის საშუალებით.',
        author: 'ლევან კვარაცხელია',
        date: '25 ნოემბერი, 2025',
        readTime: '8 წუთი',
        category: 'ბიზნესი',
        visualType: 'dots'
    },
    {
        id: 5,
        title: 'ჯანდაცვის სექტორში კარიერული შესაძლებლობები',
        excerpt: 'მედიცინისა და ჯანდაცვის სფერო მზარდი პოტენციალით გამოირჩევა. გაეცანით ახალ მიმართულებებს.',
        author: 'მარიამ ჯავახიშვილი',
        date: '22 ნოემბერი, 2025',
        readTime: '5 წუთი',
        category: 'ჯანდაცვა',
        visualType: 'wave'
    },
    {
        id: 6,
        title: 'მომავლის პროფესიები: რისთვის ემზადებოდეს სტუდენტები',
        excerpt: 'ციფრული ტრანსფორმაცია ქმნის ახალ პროფესიებს. როგორ მოემზადოთ მომავლის გამოწვევებისთვის.',
        author: 'დავით მესხია',
        date: '18 ნოემბერი, 2025',
        readTime: '9 წუთი',
        category: 'კარიერა',
        visualType: 'grid'
    },
    {
        id: 7,
        title: 'დისტანციური სწავლების ეფექტურობა',
        excerpt: 'როგორ გავხადოთ ონლაინ განათლება უფრო ინტერაქტიული და შედეგიანი. პრაქტიკული რჩევები.',
        author: 'ანა მიქელაძე',
        date: '15 ნოემბერი, 2025',
        readTime: '6 წუთი',
        category: 'განათლება',
        visualType: 'circles'
    },
    {
        id: 8,
        title: 'სტარტაპის დაფუძნება: პირველი ნაბიჯები',
        excerpt: 'იდეიდან რეალობამდე - რა გზა უნდა გაიაროს მეწარმემ წარმატებული სტარტაპის შესაქმნელად.',
        author: 'ნიკა ჩხეიძე',
        date: '12 ნოემბერი, 2025',
        readTime: '10 წუთი',
        category: 'ბიზნესი',
        visualType: 'squares'
    },
    {
        id: 9,
        title: 'პროგრამირების ენების შერჩევა დამწყებთათვის',
        excerpt: 'Python, JavaScript თუ Java? რომელი პროგრამირების ენა შეგეფერება თქვენს მიზნებს.',
        author: 'ლუკა ციხელაშვილი',
        date: '8 ნოემბერი, 2025',
        readTime: '7 წუთი',
        category: 'ტექნოლოგია',
        visualType: 'lines'
    },
    {
        id: 10,
        title: 'დიზაინ თინქინგის მეთოდოლოგია ბიზნესში',
        excerpt: 'როგორ დაგვეხმარება დიზაინ-მიდგომა ბიზნეს პრობლემების შემოქმედებითად გადაჭრაში.',
        author: 'ეკა გაბრიჩიძე',
        date: '5 ნოემბერი, 2025',
        readTime: '8 წუთი',
        category: 'ბიზნესი',
        visualType: 'dots'
    },
    {
        id: 11,
        title: 'თავდაჯერებულობა და პრეზენტაციის უნარები',
        excerpt: 'ეფექტური კომუნიკაციის ხელოვნება პროფესიულ წარმატებაში. პრაქტიკული რჩევები.',
        author: 'სალომე ნადიბაიძე',
        date: '1 ნოემბერი, 2025',
        readTime: '5 წუთი',
        category: 'კარიერა',
        visualType: 'wave'
    },
    {
        id: 12,
        title: 'კიბერუსაფრთხოების გამოწვევები 2025 წელს',
        excerpt: 'რა საფრთხეები ემუქრება ციფრულ სამყაროს და როგორ დავიცვათ საკუთარი მონაცემები.',
        author: 'გიორგი ბერიძე',
        date: '28 ოქტომბერი, 2025',
        readTime: '9 წუთი',
        category: 'ტექნოლოგია',
        visualType: 'grid'
    },
    {
        id: 13,
        title: 'ემოციური ინტელექტის როლი ლიდერობაში',
        excerpt: 'თანამედროვე ლიდერებისთვის ემოციური ინტელექტი არანაკლებ მნიშვნელოვანია ტექნიკურ უნარებზე.',
        author: 'თამარ ხარაიშვილი',
        date: '25 ოქტომბერი, 2025',
        readTime: '7 წუთი',
        category: 'კარიერა',
        visualType: 'circles'
    },
    {
        id: 14,
        title: 'მონაცემთა მეცნიერება: პროფესია მომავლისთვის',
        excerpt: 'Data Science-ის შესწავლის გზამკვლევი - საიდან დავიწყოთ და რა უნარები გვჭირდება.',
        author: 'ლუკა ციხელაშვილი',
        date: '22 ოქტომბერი, 2025',
        readTime: '11 წუთი',
        category: 'ტექნოლოგია',
        visualType: 'squares'
    },
    {
        id: 15,
        title: 'მარკეტინგის ციფრული ტრანსფორმაცია',
        excerpt: 'როგორ შეცვალა სოციალურმა მედიამ და AI-მ ტრადიციული მარკეტინგული მიდგომები.',
        author: 'ნინო გელაშვილი',
        date: '18 ოქტომბერი, 2025',
        readTime: '6 წუთი',
        category: 'ბიზნესი',
        visualType: 'lines'
    },
    {
        id: 16,
        title: 'ფინანსური წიგნიერება ახალგაზრდებისთვის',
        excerpt: 'ფინანსური დაგეგმვის საფუძვლები - როგორ მართოთ ფული და ინვესტიციები სტუდენტურ ასაკში.',
        author: 'ლევან კვარაცხელია',
        date: '15 ოქტომბერი, 2025',
        readTime: '8 წუთი',
        category: 'ბიზნესი',
        visualType: 'dots'
    },
    {
        id: 17,
        title: 'მრავალენოვნება და კარიერული შესაძლებლობები',
        excerpt: 'რატომ არის მნიშვნელოვანი უცხო ენების ცოდნა გლობალურ სამუშაო ბაზარზე.',
        author: 'ანა მიქელაძე',
        date: '12 ოქტომბერი, 2025',
        readTime: '5 წუთი',
        category: 'განათლება',
        visualType: 'wave'
    },
    {
        id: 18,
        title: 'გრინ ტექნოლოგიები და მდგრადი განვითარება',
        excerpt: 'ეკოლოგიურად სუფთა ტექნოლოგიები და მათი როლი მომავლის ეკონომიკაში.',
        author: 'დავით მესხია',
        date: '8 ოქტომბერი, 2025',
        readTime: '7 წუთი',
        category: 'ტექნოლოგია',
        visualType: 'grid'
    }

];

function BlogVisual({ type }) {
    const visuals = {
        circles: (
            <div className="relative w-full h-full">
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-secondary"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-primary"></div>
                <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-white border-2 border-primary"></div>
            </div>
        ),
        squares: (
            <div className="relative w-full h-full">
                <div className="absolute top-8 right-8 w-14 h-14 bg-primary rotate-12"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-secondary"></div>
                <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-white border-2 border-secondary rotate-45"></div>
            </div>
        ),
        lines: (
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-4 left-0 right-0 h-1 bg-secondary"></div>
                <div className="absolute top-12 left-0 right-0 h-2 bg-primary"></div>
                <div className="absolute top-24 left-0 right-0 h-1 bg-secondary"></div>
                <div className="absolute bottom-8 left-0 w-1 top-0 bg-primary"></div>
                <div className="absolute bottom-8 right-12 w-2 top-0 bg-secondary"></div>
            </div>
        ),
        dots: (
            <div className="relative w-full h-full">
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary"></div>
                <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-secondary"></div>
                <div className="absolute bottom-12 left-12 w-3 h-3 rounded-full bg-primary"></div>
                <div className="absolute bottom-6 right-6 w-5 h-5 rounded-full bg-secondary"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="absolute top-16 left-1/3 w-3 h-3 rounded-full bg-secondary"></div>
            </div>
        ),
        wave: (
            <div className="relative w-full h-full overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 160" preserveAspectRatio="none">
                    <path d="M0,80 Q50,40 100,80 T200,80" fill="none" className="stroke-secondary" strokeWidth="3" />
                    <path d="M0,100 Q50,60 100,100 T200,100" fill="none" className="stroke-primary" strokeWidth="4" />
                    <path d="M0,120 Q50,80 100,120 T200,120" fill="none" className="stroke-secondary" strokeWidth="2" />
                </svg>
            </div>
        ),
        grid: (
            <div className="relative w-full h-full">
                <div className="grid grid-cols-4 grid-rows-4 gap-2 p-4 h-full">
                    <div className="bg-primary"></div>
                    <div className="bg-white border border-primary"></div>
                    <div className="bg-secondary"></div>
                    <div className="bg-white border border-secondary"></div>
                    <div className="bg-white border border-primary"></div>
                    <div className="bg-secondary"></div>
                    <div className="bg-white border border-primary"></div>
                    <div className="bg-primary"></div>
                    <div className="bg-secondary"></div>
                    <div className="bg-white border border-secondary"></div>
                    <div className="bg-primary"></div>
                    <div className="bg-white border border-primary"></div>
                </div>
            </div>
        )
    };

    return visuals[type] || visuals.circles;
}

const Blogs = () => {
    const navigate = useNavigate();

    const handleBlogClick = (postId) => {
        navigate(`/blog/${postId}`);
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
            <section className="relative px-8 py-20 bg-primary overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
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
                    className="relative z-10 max-w-4xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    <h1 className="text-5xl text-white mb-6">ბლოგი</h1>
                    <p className="text-xl text-white/80">
                        გაეცანით უახლეს სტატიებს კარიერის, განათლებისა და პროფესიული განვითარების შესახებ
                    </p>
                </motion.div>
            </section>

            {/* Blog Grid */}
            <section className="px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            onClick={() => handleBlogClick(post.id)}
                            className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-secondary transition-all duration-300 hover:shadow-xl cursor-pointer group"
                        >
                            {/* Visual */}
                            <div className="h-48 bg-gray-50 relative overflow-hidden">
                                <BlogVisual type={post.visualType} />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Category */}
                                <div className="inline-block px-3 py-1 text-secondary bg-secondary/10 rounded-full text-sm mb-4">
                                    {post.category}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Read More */}
                                <button className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors">
                                    <span>ვრცლად</span>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
