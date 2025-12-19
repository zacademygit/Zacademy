// src/pages/Index.jsx

import Hero from '../components/home/Hero';
import TopMentors from '../components/home/TopMentors';
import WhyDifferent from '../components/home/WhyDifferent';
import WhyUs from '../components/home/WhyUs';
import Testimonials from '../components/home/Testimonials';
import BlogsSection from '../components/home/BlogsSection';
import FAQ from '../components/home/FAQ';

const Index = () => {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <TopMentors />
            <WhyDifferent />
            <WhyUs />
            <Testimonials />
            <BlogsSection />
            <FAQ />
        </div>
    );
};

export default Index;
