// src/pages/BlogPost.jsx

import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import blogPostsData from '../data/blogPosts.json';

// Default content for posts without full content
const defaultBlogContent = {
  introduction: 'ეს სტატია განიხილავს აქტუალურ საკითხებს, რომლებიც მნიშვნელოვანია თანამედროვე პროფესიონალებისთვის. ჩვენ შევეცდებით დეტალურად გავაანალიზოთ ყველა მნიშვნელოვანი ასპექტი.',
  sections: [
    {
      heading: 'ძირითადი კონცეფციები',
      content: 'პირველ რიგში, მნიშვნელოვანია გავიგოთ საკითხის არსი და კონტექსტი. ეს საშუალებას მოგვცემს უკეთ გავერკვეთ დეტალებში და მივიღოთ სწორი გადაწყვეტილებები. თანამედროვე რეალობაში ეს საკითხი უფრო და უფრო აქტუალური ხდება.'
    },
    {
      heading: 'პრაქტიკული რეკომენდაციები',
      content: 'გამოცდილებიდან გამომდინარე, შეგვიძლია ვთქვათ, რომ სწორი მიდგომა გულისხმობს რამდენიმე მნიშვნელოვან ფაქტორს. უპირველეს ყოვლისა, საჭიროა სისტემური და თანმიმდევრული მუშაობა. მეორე, მნიშვნელოვანია უწყვეტი სწავლა და განვითარება.'
    },
    {
      heading: 'გამოწვევები და გადაწყვეტილებები',
      content: 'ყველა სფეროში არსებობს გამოწვევები, რომლებიც საჭიროებენ კრეატიულ და ინოვაციურ მიდგომას. მნიშვნელოვანია არა მხოლოდ პრობლემების იდენტიფიცირება, არამედ ეფექტური გადაწყვეტილებების პოვნა. ეს მოითხოვს როგორც თეორიულ ცოდნას, ასევე პრაქტიკულ გამოცდილებას.'
    },
    {
      heading: 'მომავლის პერსპექტივები',
      content: 'როცა ვსაუბრობთ მომავალზე, მნიშვნელოვანია ვიყოთ ოპტიმისტურები, მაგრამ რეალისტურებიც. ცვლილებები გარდაუვალია, და ჩვენი წარმატება დამოკიდებულია იმაზე, თუ რამდენად კარგად ვხართ მომზადებულები ამ ცვლილებებისთვის.'
    }
  ],
  conclusion: 'დასკვნის სახით შეიძლება ითქვას, რომ ეს საკითხი მოითხოვს სერიოზულ ყურადღებას და სისტემურ მიდგომას. წარმატება მოითხოვს როგორც ცოდნას, ასევე მოტივაციას და შრომას. დარჩით კურსში ჩვენს ბლოგში, სადაც რეგულარულად ვაქვეყნებთ ახალ სტატიებს.'
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPostsData[id];

  // Use default content for posts that don't have full content yet
  const content = post ? post.fullContent : defaultBlogContent;
  const postData = post || {
    title: 'სტატია',
    author: 'ავტორი',
    date: 'თარიღი',
    readTime: '5 წუთი',
    category: 'კატეგორია'
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postData.title,
        text: postData.excerpt,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('ბმული დაკოპირებულია!');
    }
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    alert('შენახვის ფუნქციონალი მალე დაემატება!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <article className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>უკან ბლოგზე</span>
          </button>

          {/* Category Badge */}
          <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full mb-6">
            {postData.category}
          </div>

          {/* Title */}
          <h1 className="text-5xl text-primary mb-6 text-left">
            {postData.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b-2 border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={20} />
              <span>{postData.author}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} />
              <span>{postData.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={20} />
              <span>{postData.readTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <Share2 size={20} />
              <span>გაზიარება</span>
            </button>
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <Bookmark size={20} />
              <span>შენახვა</span>
            </button>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8 whitespace-pre-line text-left">
              {content.introduction}
            </p>

            {/* Sections */}
            {content.sections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-3xl text-primary mb-4 text-left">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-left">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Conclusion */}
            <div className="mt-12 p-8 bg-primary/5 rounded-2xl border-2 border-primary/10">
              <h2 className="text-3xl text-primary mb-4 text-left">დასკვნა</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-left">
                {content.conclusion}
              </p>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-2xl text-primary mb-4 text-left">ავტორის შესახებ</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white text-2xl">
                {postData.author.charAt(0)}
              </div>
              <div>
                <p className="text-xl text-primary mb-2">{postData.author}</p>
                <p className="text-gray-600">
                  პროფესიონალი მენტორი და ექსპერტი {postData.category.toLowerCase()} სფეროში. აქტიურად წერს და იზიარებს ცოდნას პროფესიული განვითარების თემაზე.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/blogs')}
              className="px-8 py-4 bg-secondary text-white rounded-full hover:opacity-90 transition-opacity"
            >
              იხილეთ მეტი სტატია
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
