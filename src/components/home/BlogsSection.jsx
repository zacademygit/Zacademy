// src/components/home/BlogsSection.jsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Blog post data with images - Row 1
const blogPostsRow1 = [
    {
        id: 1,
        title: 'როგორ ავირჩიოთ სწორი მენტორი კარიერული წინსვლისთვის',
        excerpt: 'მენტორის არჩევა მნიშვნელოვანი ნაბიჯია პროფესიულ განვითარებაში. განვიხილოთ რა კრიტერიუმებით უნდა ვიხელმძღვანელოთ.',
        category: 'კარიერა',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    {
        id: 2,
        title: 'STEM განათლების მომავალი საქართველოში',
        excerpt: 'ტექნოლოგიური განვითარება სწრაფად ცვლის განათლების ლანდშაფტს. რა შესაძლებლობები გვხვდება STEM სფეროში.',
        category: 'განათლება',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
    },
    {
        id: 3,
        title: 'ხელოვნური ინტელექტი და კრეატიული ინდუსტრიები',
        excerpt: 'AI ტექნოლოგიები ახალ შესაძლებლობებს ქმნიან დიზაინერებისა და მედია პროფესიონალებისთვის.',
        category: 'ტექნოლოგია',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
        id: 4,
        title: 'ბიზნეს-განათლება: თეორია vs პრაქტიკა',
        excerpt: 'როგორ გავაერთიანოთ აკადემიური ცოდნა რეალურ ბიზნეს გამოცდილებასთან მენტორშიპის საშუალებით.',
        category: 'ბიზნესი',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
    },
    {
        id: 5,
        title: 'ჯანდაცვის სექტორში კარიერული შესაძლებლობები',
        excerpt: 'მედიცინისა და ჯანდაცვის სფერო მზარდი პოტენციალით გამოირჩევა. გაეცანით ახალ მიმართულებებს.',
        category: 'ჯანდაცვა',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
    },
    {
        id: 6,
        title: 'მომავლის პროფესიები: რისთვის ემზადებოდეს სტუდენტები',
        excerpt: 'ციფრული ტრანსფორმაცია ქმნის ახალ პროფესიებს. როგორ მოემზადოთ მომავლის გამოწვევებისთვის.',
        category: 'კარიერა',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
    }
];

// Blog post data with images - Row 2
const blogPostsRow2 = [
    {
        id: 7,
        title: 'დისტანციური სწავლების ეფექტურობა',
        excerpt: 'როგორ გავხადოთ ონლაინ განათლება უფრო ინტერაქტიული და შედეგიანი. პრაქტიკული რჩევები.',
        category: 'განათლება',
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80'
    },
    {
        id: 8,
        title: 'სტარტაპის დაფუძნება: პირველი ნაბიჯები',
        excerpt: 'იდეიდან რეალობამდე - რა გზა უნდა გაიაროს მეწარმემ წარმატებული სტარტაპის შესაქმნელად.',
        category: 'ბიზნესი',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80'
    },
    {
        id: 9,
        title: 'პროგრამირების ენების შერჩევა დამწყებთათვის',
        excerpt: 'Python, JavaScript თუ Java? რომელი პროგრამირების ენა შეგეფერება თქვენს მიზნებს.',
        category: 'ტექნოლოგია',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80'
    },
    {
        id: 10,
        title: 'დიზაინ თინქინგის მეთოდოლოგია ბიზნესში',
        excerpt: 'როგორ დაგვეხმარება დიზაინ-მიდგომა ბიზნეს პრობლემების შემოქმედებითად გადაჭრაში.',
        category: 'ბიზნესი',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
    },
    {
        id: 11,
        title: 'თავდაჯერებულობა და პრეზენტაციის უნარები',
        excerpt: 'ეფექტური კომუნიკაციის ხელოვნება პროფესიულ წარმატებაში. პრაქტიკული რჩევები.',
        category: 'კარიერა',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80'
    },
    {
        id: 12,
        title: 'კიბერუსაფრთხოების გამოწვევები 2025 წელს',
        excerpt: 'რა საფრთხეები ემუქრება ციფრულ სამყაროს და როგორ დავიცვათ საკუთარი მონაცემები.',
        category: 'ტექნოლოგია',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
    }
];

const BlogsSection = () => {
    const navigate = useNavigate();
    const [isPausedRow1, setIsPausedRow1] = useState(false);
    const [isPausedRow2, setIsPausedRow2] = useState(false);
    const scrollContainerRow1Ref = useRef(null);
    const scrollContainerRow2Ref = useRef(null);
    const animationRow1Ref = useRef(null);
    const animationRow2Ref = useRef(null);
    const isDraggingRow1 = useRef(false);
    const isDraggingRow2 = useRef(false);
    const startXRow1 = useRef(0);
    const startXRow2 = useRef(0);
    const scrollLeftRow1 = useRef(0);
    const scrollLeftRow2 = useRef(0);

    // Duplicate posts for infinite scroll effect
    const duplicatedPostsRow1 = [...blogPostsRow1, ...blogPostsRow1, ...blogPostsRow1];
    const duplicatedPostsRow2 = [...blogPostsRow2, ...blogPostsRow2, ...blogPostsRow2];

    // First carousel - scrolls left to right
    useEffect(() => {
        const scrollContainer = scrollContainerRow1Ref.current;
        if (!scrollContainer) return;

        const scrollSpeed = 0.75; // pixels per frame (1.5x faster)
        const cardWidth = 400; // approximate card width + gap
        const totalWidth = blogPostsRow1.length * cardWidth;

        const scroll = () => {
            if (!isPausedRow1) {
                // Read current position from DOM
                let currentPosition = scrollContainer.scrollLeft;
                currentPosition += scrollSpeed;

                // Reset position for infinite loop
                if (currentPosition >= totalWidth) {
                    currentPosition = currentPosition - totalWidth;
                }

                scrollContainer.scrollLeft = currentPosition;
            }
            animationRow1Ref.current = requestAnimationFrame(scroll);
        };

        animationRow1Ref.current = requestAnimationFrame(scroll);

        return () => {
            if (animationRow1Ref.current) {
                cancelAnimationFrame(animationRow1Ref.current);
            }
        };
    }, [isPausedRow1]);

    // Second carousel - scrolls right to left (reverse)
    useEffect(() => {
        const scrollContainer = scrollContainerRow2Ref.current;
        if (!scrollContainer) return;

        const cardWidth = 400;
        const totalWidth = blogPostsRow2.length * cardWidth;

        const scroll = () => {
            if (!isPausedRow2) {
                // Read current position from DOM
                let currentPosition = scrollContainer.scrollLeft;
                currentPosition -= 0.75; // Scroll in reverse (1.5x faster)

                // Reset position for infinite loop
                if (currentPosition <= 0) {
                    currentPosition = currentPosition + totalWidth;
                }

                scrollContainer.scrollLeft = currentPosition;
            }
            animationRow2Ref.current = requestAnimationFrame(scroll);
        };

        animationRow2Ref.current = requestAnimationFrame(scroll);

        return () => {
            if (animationRow2Ref.current) {
                cancelAnimationFrame(animationRow2Ref.current);
            }
        };
    }, [isPausedRow2]);

    // Mouse wheel scroll for Row 1
    useEffect(() => {
        const scrollContainer = scrollContainerRow1Ref.current;
        if (!scrollContainer) return;

        const handleWheel = (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        };

        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Mouse wheel scroll for Row 2
    useEffect(() => {
        const scrollContainer = scrollContainerRow2Ref.current;
        if (!scrollContainer) return;

        const handleWheel = (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        };

        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Drag to scroll handlers for Row 1
    const handleMouseDownRow1 = (e) => {
        isDraggingRow1.current = true;
        startXRow1.current = e.pageX - scrollContainerRow1Ref.current.offsetLeft;
        scrollLeftRow1.current = scrollContainerRow1Ref.current.scrollLeft;
        scrollContainerRow1Ref.current.style.cursor = 'grabbing';
    };

    const handleMouseLeaveRow1 = () => {
        isDraggingRow1.current = false;
        scrollContainerRow1Ref.current.style.cursor = 'grab';
    };

    const handleMouseUpRow1 = () => {
        isDraggingRow1.current = false;
        scrollContainerRow1Ref.current.style.cursor = 'grab';
    };

    const handleMouseMoveRow1 = (e) => {
        if (!isDraggingRow1.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRow1Ref.current.offsetLeft;
        const walk = (x - startXRow1.current) * 2;
        scrollContainerRow1Ref.current.scrollLeft = scrollLeftRow1.current - walk;
    };

    // Drag to scroll handlers for Row 2
    const handleMouseDownRow2 = (e) => {
        isDraggingRow2.current = true;
        startXRow2.current = e.pageX - scrollContainerRow2Ref.current.offsetLeft;
        scrollLeftRow2.current = scrollContainerRow2Ref.current.scrollLeft;
        scrollContainerRow2Ref.current.style.cursor = 'grabbing';
    };

    const handleMouseLeaveRow2 = () => {
        isDraggingRow2.current = false;
        scrollContainerRow2Ref.current.style.cursor = 'grab';
    };

    const handleMouseUpRow2 = () => {
        isDraggingRow2.current = false;
        scrollContainerRow2Ref.current.style.cursor = 'grab';
    };

    const handleMouseMoveRow2 = (e) => {
        if (!isDraggingRow2.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRow2Ref.current.offsetLeft;
        const walk = (x - startXRow2.current) * 2;
        scrollContainerRow2Ref.current.scrollLeft = scrollLeftRow2.current - walk;
    };

    const handleBlogClick = (postId) => {
        // Only navigate if not dragging
        if (!isDraggingRow1.current && !isDraggingRow2.current) {
            navigate(`/blog/${postId}`);
        }
    };

    const handleViewAllClick = () => {
        navigate('/blogs');
    };

    // Animation variants
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
        <section className="bg-gray-50 px-8 py-32">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headingVariants}
                >
                    <h2 className="text-5xl mb-4">უახლესი სტატიები</h2>
                    <p className="text-xl text-gray-600">
                        გაეცანით კარიერის, განათლებისა და პროფესიული განვითარების შესახებ
                    </p>
                </motion.div>

                {/* First Carousel - Scrolls Left to Right */}
                <div
                    className="relative overflow-hidden mb-8"
                    onMouseEnter={() => setIsPausedRow1(true)}
                    onMouseLeave={() => setIsPausedRow1(false)}
                >
                    <div
                        ref={scrollContainerRow1Ref}
                        className="flex gap-6 overflow-x-hidden select-none"
                        style={{ scrollBehavior: 'auto', cursor: 'grab' }}
                        onMouseDown={handleMouseDownRow1}
                        onMouseLeave={handleMouseLeaveRow1}
                        onMouseUp={handleMouseUpRow1}
                        onMouseMove={handleMouseMoveRow1}
                    >
                        {duplicatedPostsRow1.map((post, index) => (
                            <div
                                key={`row1-${post.id}-${index}`}
                                onClick={() => handleBlogClick(post.id)}
                                className="flex-shrink-0 w-[380px] h-[250px] rounded-xl overflow-hidden cursor-pointer group relative"
                            >
                                {/* Background Image */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    {/* Category Badge */}
                                    <div className="inline-block self-start px-3 py-1 bg-secondary text-white rounded-full text-sm mb-3">
                                        {post.category}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl text-white mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Read More */}
                                    <div className="flex items-center gap-2 text-white group-hover:text-secondary transition-colors text-sm">
                                        <span>ვრცლად</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Carousel - Scrolls Right to Left */}
                <div
                    className="relative overflow-hidden mb-12"
                    onMouseEnter={() => setIsPausedRow2(true)}
                    onMouseLeave={() => setIsPausedRow2(false)}
                >
                    <div
                        ref={scrollContainerRow2Ref}
                        className="flex gap-6 overflow-x-hidden select-none"
                        style={{ scrollBehavior: 'auto', cursor: 'grab' }}
                        onMouseDown={handleMouseDownRow2}
                        onMouseLeave={handleMouseLeaveRow2}
                        onMouseUp={handleMouseUpRow2}
                        onMouseMove={handleMouseMoveRow2}
                    >
                        {duplicatedPostsRow2.map((post, index) => (
                            <div
                                key={`row2-${post.id}-${index}`}
                                onClick={() => handleBlogClick(post.id)}
                                className="flex-shrink-0 w-[380px] h-[250px] rounded-xl overflow-hidden cursor-pointer group relative"
                            >
                                {/* Background Image */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    {/* Category Badge */}
                                    <div className="inline-block self-start px-3 py-1 bg-secondary text-white rounded-full text-sm mb-3">
                                        {post.category}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl text-white mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Read More */}
                                    <div className="flex items-center gap-2 text-white group-hover:text-secondary transition-colors text-sm">
                                        <span>ვრცლად</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <button
                        onClick={handleViewAllClick}
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity cursor-pointer text-lg"
                    >
                        <span>ყველა სტატია</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogsSection;
