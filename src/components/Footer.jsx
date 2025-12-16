import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const [isChecked, setIsChecked] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="px-4 xs:px-8 py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl xs:text-2xl  mb-3">გამოიწერეთ ჩვენი სიახლეები</h3>
          <p className="text-sm xs:text-base text-gray-700 mb-6">იყავით განახლებული ჩვენი უახლესი სიახლეებითა და ექსკლუზიური შეთავაზებებით</p>
          <div className="flex flex-col xs:flex-row gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder="შეიყვანეთ თქვენი ელფოსტა"
              className="flex-1 px-4 py-3 bg-white rounded-full border-2 border-gray-200 focus:border-secondary focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button className="w-full xs:w-auto px-6 py-3 bg-secondary rounded-full hover:opacity-90 transition-opacity text-light-text">
              გამოწერა
            </button>
          </div>
          <div className="flex items-start justify-center gap-2 max-w-md mx-auto">
            <input
              type="checkbox"
              id="newsletter-consent"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 w-4 h-4 appearance-none border-2 border-gray-300 bg-white checked:bg-secondary checked:border-secondary cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-light-text checked:after:text-xs checked:after:left-[1px] checked:after:top-[-2px]"
            />
            <label htmlFor="newsletter-consent" className="text-sm text-gray-600 text-center cursor-pointer">
              ვეთანხმები, მივიღო განახლებები ელექტრონული ფოსტით Z-Academy-ის ყველა პროდუქტის შესახებ.
            </label>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-4 xs:px-8 py-20 bg-secondary text-light-text">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-12 mb-12">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="text-2xl font-bold text-light-text">Z-Academy</span>
              </div>
              <div className="flex gap-3 justify-center md:justify-start">
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="text-center md:text-left">
              <ul className="space-y-2 text-light-text/80">
                <li>
                  <Link to="/" onClick={scrollToTop} className="hover:text-secondary transition-colors">
                    მთავარი
                  </Link>
                </li>
                <li>
                  <Link to="/mentors" onClick={scrollToTop} className="hover:text-secondary transition-colors">
                    მენტორები
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" onClick={scrollToTop} className="hover:text-secondary transition-colors">
                    ბლოგი
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={scrollToTop} className="hover:text-secondary transition-colors">
                    ჩვენს შესახებ
                  </Link>
                </li>
                <li>
                  <Link to="/support" onClick={scrollToTop} className="hover:text-secondary transition-colors">
                    დახმარება
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <ul className="space-y-3 text-light-text/80">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} />
                  <a href="mailto:info@academy.ge" className="hover:text-secondary transition-colors">info@academy.ge</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Phone size={16} />
                  <a href="tel:+995555123456" className="hover:text-secondary transition-colors">+995 555 123 456</a>
                </li>
                <li className="flex items-start justify-center md:justify-start gap-2">
                  <MapPin size={16} className="mt-1" />
                  <span>თბილისი, საქართველო</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-light-text/80">
            <p className="text-center md:text-left">&copy; 2025 Academy. ყველა უფლება დაცულია.</p>
            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 text-center xs:text-left">
              <Link
                to="/privacy-policy"
                onClick={scrollToTop}
                className="hover:text-secondary transition-colors"
              >
                კონფიდენციალურობის პოლიტიკა
              </Link>
              <Link
                to="/terms-of-service"
                onClick={scrollToTop}
                className="hover:text-secondary transition-colors"
              >
                მომსახურების პირობები
              </Link>
              <Link
                to="/cookie-policy"
                onClick={scrollToTop}
                className="hover:text-secondary transition-colors"
              >
                Cookie პოლიტიკა
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
