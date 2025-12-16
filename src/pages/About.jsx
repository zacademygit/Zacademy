// src/pages/About.jsx

import { Users, Target, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const navigate = useNavigate();

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

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // PowerPoint-style float in animation for each card
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Animation for section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <section className="relative bg-primary px-8 py-24">
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          <h1 className="text-white mb-6 text-5xl font-bold">ჩვენს შესახებ</h1>
          <p className="text-white/90 text-xl leading-relaxed">
            ჩვენ ვქმნით პლატფორმას, სადაც სტუდენტები და ახალგაზრდა პროფესიონალები
            პოულობენ გამოცდილ მენტორებს თავიანთი კარიერის განვითარებისთვის
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="px-8 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className=" mb-6 text-4xl font-bold">ჩვენი მისია</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ჩვენი მისიაა დავუკავშიროთ ერთმანეთს ახალგაზრდა ნიჭიერი ადამიანები და
                გამოცდილი პროფესიონალები, რათა შევქმნათ საქართველოში ძლიერი მენტორშიპის
                კულტურა.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ჩვენ გვჯერა, რომ თითოეულ ადამიანს სჭირდება გზამკვლევი, რომელიც დაეხმარება
                კარიერული გზის გავლაში, პროფესიული უნარების განვითარებაში და მიზნების
                მიღწევაში.
              </p>
            </div>
            <div className="bg-secondary rounded-2xl p-12 text-center">
              <div className="text-white text-6xl mb-4 font-bold">1000+</div>
              <div className="text-white text-xl">აქტიური მენტორი</div>
              <div className="border-t border-white/30 my-6"></div>
              <div className="text-white text-6xl mb-4 font-bold">5000+</div>
              <div className="text-white text-xl">წარმატებული სესია</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-8 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className=" text-center mb-16 text-4xl font-bold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headingVariants}
          >
            ჩვენი ღირებულებები
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              variants={cardVariants}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-secondary" size={32} />
              </div>
              <h3 className=" mb-4 text-xl font-bold">თანამშრომლობა</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ვქმნით გარემოს, სადაც ცოდნის გაზიარება და ურთიერთდახმარება
                ფასდაუდებელია
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              variants={cardVariants}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-secondary" size={32} />
              </div>
              <h3 className=" mb-4 text-xl font-bold">მიზანზე ორიენტირება</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ვეხმარებით თითოეულ სტუდენტს განსაზღვროს და მიაღწიოს თავის
                კარიერულ მიზნებს
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              variants={cardVariants}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-secondary" size={32} />
              </div>
              <h3 className=" mb-4 text-xl font-bold">ხარისხი</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ყველა მენტორი გადის გადამოწმებას, რათა უზრუნველყოფილი იყოს
                მაღალი ხარისხის მომსახურება
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              variants={cardVariants}
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-secondary" size={32} />
              </div>
              <h3 className=" mb-4 text-xl font-bold">ზრუნვა</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ჩვენთვის მნიშვნელოვანია თითოეული წევრის პირადი და
                პროფესიული განვითარება
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-8 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className=" text-center mb-12 text-4xl font-bold">ჩვენი ისტორია</h2>

          <div className="space-y-8">
            <div className="border-l-4 border-secondary pl-8">
              <div className="text-secondary mb-2 font-semibold">2023 წელი</div>
              <h3 className=" mb-3 text-2xl font-bold">დაფუძნება</h3>
              <p className="text-gray-700 leading-relaxed">
                პლატფორმა შეიქმნა იდეით, რომ ყველა სტუდენტს უნდა ჰქონდეს წვდომა
                ხარისხიან მენტორშიპზე. დავიწყეთ მცირე ჯგუფით ენთუზიაზმით სავსე
                მენტორებისა და სტუდენტებისგან.
              </p>
            </div>

            <div className="border-l-4 border-secondary pl-8">
              <div className="text-secondary mb-2 font-semibold">2024 წელი</div>
              <h3 className=" mb-3 text-2xl font-bold">ზრდა და განვითარება</h3>
              <p className="text-gray-700 leading-relaxed">
                პლატფორმამ მიიღო ათასობით სტუდენტის ნდობა. გავაფართოვეთ მენტორების
                ბაზა და დავამატეთ ახალი ფუნქციონალები, რათა უკეთ მოვემსახურეთ ჩვენს
                თემს.
              </p>
            </div>

            <div className="border-l-4 border-secondary pl-8">
              <div className="text-secondary mb-2 font-semibold">2025 წელი</div>
              <h3 className=" mb-3 text-2xl font-bold">ახალი ეტაპი</h3>
              <p className="text-gray-700 leading-relaxed">
                დღეს ჩვენ ვართ საქართველოს უმსხვილესი მენტორშიპის პლატფორმა, რომელიც
                აერთიანებს 1000+ მენტორს და ათასობით სტუდენტს. ჩვენი მიზანია
                განვაგრძოთ ზრდა და გავხადოთ ხარისხიანი მენტორშიპი ხელმისაწვდომი ყველასთვის.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-8 py-24 bg-primary">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-white mb-6 text-4xl font-bold">შემოგვიერთდი ჩვენს მისიაში</h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            იქნება თუ სტუდენტი ხარ, რომელიც ეძებს გამოცდილ მენტორს, თუ პროფესიონალი,
            რომელიც სურს გააზიაროს ცოდნა - ჩვენი პლატფორმა შექმნილია შენთვის
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/mentors')}
              className="px-8 py-3 bg-secondary text-white rounded-full hover:opacity-90 transition-opacity font-semibold"
            >
              იპოვე მენტორი
            </button>
            <button
              onClick={() => navigate('/auth/register/mentor')}
              className="px-8 py-3 bg-white  rounded-full hover:opacity-90 transition-opacity font-semibold"
            >
              გახდი მენტორი
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
