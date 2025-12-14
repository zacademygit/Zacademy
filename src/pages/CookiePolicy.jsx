// src/pages/CookiePolicy.jsx

import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Grid Pattern */}
      <div className="relative bg-primary overflow-hidden">
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

        <div className="relative z-10 px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Cookie className="w-12 h-12 text-light-text" />
              <h1 className="text-5xl text-light-text">
                „მზა ჩანაწერების" (Cookies) პოლიტიკა
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-left">

            {/* Section 1: Definitions */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">განსაზღვრებები</h2>
              <p className="text-gray-700 mb-4 text-left">
                წინამდებარე დოკუმენტში გამოყენებულ ტერმინებს აქვთ შემდეგი მნიშვნელობა:
              </p>
              <div className="space-y-4 text-gray-700 text-left">
                <p>„თქვენ" ან „რეგისტრირებული მომხმარებელი" – აღნიშნავს ვიზიტორს ან რეგისტრირებულ მომხმარებელს, რომელიც იყენებს პლატფორმას.</p>
                <p>„ჩვენ", „კომპანია" ან „თრინითი" – აღნიშნავს შპს „თრინითი ლაბს"-ს (საიდენტიფიკაციო ნომერი: 406536208), რომელიც რეგისტრირებულია საქართველოს კანონმდებლობის შესაბამისად.</p>
                <p>„პლატფორმა" – ნიშნავს ვებგვერდს www.z-academy.ge და მის ქვე-დომენებს, მობილურ აპლიკაციებს ან სხვა სისტემებს, რომლებიც ეკუთვნის და იმართება თრინითის მიერ.</p>
                <p>„ვიზიტორი" – არის პირი, რომელიც სტუმრობს პლატფორმას რეგისტრაციის გარეშე და იყენებს ხელმისაწვდომ ფუნქციონალს.</p>
                <p>„რეგისტრირებული მომხმარებელი" – არის პირი, რომელმაც გაიარა რეგისტრაცია პლატფორმაზე, როგორც მენტორი ან მომხმარებელი.</p>
                <p>„მენტორი" – არის რეგისტრირებული მომხმარებელი, რომელიც პლატფორმის მეშვეობით სთავაზობს სერვისებს/კონსულტაციებს.</p>
                <p>„მომხმარებელი" – არის რეგისტრირებული მომხმარებელი, რომელიც პლატფორმის მეშვეობით ყიდულობს მენტორის სერვისს და სარგებლობს მისით.</p>
              </div>
            </section>

            {/* Section 2: General Information */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">ზოგადი ინფორმაცია</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>ჩვენი ვებ-გვერდი www.z-academy.ge იყენებს Cookie ფაილებს მხოლოდ იმ მიზნით, რომ გავაუმჯობესოთ პლატფორმის ფუნქციონირება და მომხმარებელთა გამოცდილება. Cookie ფაილი არის მცირე ტექსტური ფაილი, რომელიც შენახულია მომხმარებლის მოწყობილობაზე და ხელს უწყობს საიტის მუშაობას.</p>
              </div>
            </section>

            {/* Section 3: Used Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">გამოყენებული Cookie ფაილები</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>ჩვენ ვიყენებთ მხოლოდ Google Analytics-ის Cookie ფაილებს, რომლებიც საშუალებას გვაძლევს:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>გავიგოთ, როგორ იყენებენ რეგისტრირებული მომხმარებლები და ვიზიტორები ჩვენს პლატფორმას;</li>
                  <li>ვნახოთ ვიზიტების სტატისტიკა (მაგალითად, რომელ გვერდებზე შედიან რეგისტრირებული მომხმარებლები/ვიზიტორები, რამდენ ხანს რჩებიან და ა.შ.);</li>
                  <li>გავაუმჯობესოთ ვებსაიტის შინაარსი და ნავიგაცია.</li>
                </ul>
                <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary mt-4">
                  ეს მონაცემები აგროვებს ზოგად, არაპერსონალურ ინფორმაციას და არ იძლევა თქვენი იდენტიფიცირების საშუალებას.
                </p>
              </div>
            </section>

            {/* Section 4: Cookie Management */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">Cookie ფაილების მართვა</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>თქვენ შეგიძლიათ ნებისმიერ დროს გაააქტიუროთ ან დაბლოკოთ Cookie ფაილები თქვენი ბრაუზერის პარამეტრებიდან.</p>
                <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-secondary">
                  თუ გადაწყვიტავთ Cookie ფაილების გამორთვას, შესაძლოა ზოგიერთი ფუნქცია პლატფორმაზე არ იყოს სრულად ხელმისაწვდომი.
                </p>
              </div>
            </section>

            {/* Section 5: Third Party Sharing */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">მესამე პირებთან გაზიარება</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>Cookie მონაცემებს ამუშავებს მხოლოდ Google LLC, როგორც მესამე პირი, და მხოლოდ ანონიმურ ფორმატში. Google Analytics-ის მომსახურება რეგულირდება Google-ის კონფიდენციალურობის პოლიტიკით.</p>
              </div>
            </section>

            {/* Section 6: Changes to Cookie Policy */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">ცვლილებები Cookie პოლიტიკაში</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>თრინითი იტოვებს უფლებას, საჭიროების შემთხვევაში განაახლოს წინამდებარე პოლიტიკა.</p>
                <p>დოკუმენტში ცვლილებები შეიტანება ვებ გვერდზე გამოქვეყნების გზით და ცვლილებებს უნდა გაეცნოთ პერიოდულად. ცვლილებების შესახებ პერსონალურად გეცნობებათ მხოლოდ იმ შემთხვევაში, თუ ეს ვალდებულება გამომდინარეობს მოქმედი კანონმდებლობიდან.</p>
              </div>
            </section>

            {/* Section 7: Language Version */}
            <section className="mb-12">
              <h2 className="text-3xl text-primary mb-6 text-left">ენების ვერსია</h2>
              <div className="space-y-4 text-gray-700 text-left">
                <p>დოკუმენტი შეიძლება ხელმისაწვდომი იყოს სხვადასხვა ენაზე. შეუსაბამობის შემთხვევაში უპირატესობა ენიჭება ქართულ ვერსიას.</p>
              </div>
            </section>

            {/* Visual Element: Cookie Info Card */}
            <div className="bg-gradient-to-r from-primary to-[#2a4fa8] text-light-text p-8 rounded-2xl mb-12">
              <div className="flex items-start gap-4">
                <Cookie className="w-12 h-12 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl mb-3">რას აკეთებს Cookie?</h3>
                  <p className="text-light-text/90 mb-3">
                    Cookie ფაილები გეხმარებათ უკეთ იმოქმედოთ პლატფორმაზე და დაიმახსოვროთ თქვენი პარამეტრები შემდეგი ვიზიტისთვის.
                  </p>
                  <p className="text-light-text/90">
                    ჩვენ ვიყენებთ მხოლოდ Google Analytics-ს, რომელიც აგროვებს ანონიმურ სტატისტიკას პლატფორმის გასაუმჯობესებლად.
                  </p>
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="mt-16 pt-8 border-t-2 border-gray-200 text-center text-gray-600">
              <p className="mb-2">ვერსია 0.0.1</p>
              <p className="mb-2">გამოქვეყნების თარიღი: 2025 წლის 1 დეკემბერი</p>
              <p>ბოლო ცვლილების თარიღი: 2025 წლის 1 დეკემბერი</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
