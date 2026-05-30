import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import BookingPage from './sections/BookingPage';

function App() {
  const [currentHash, setCurrentHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      const wasBooking = currentHash === '#/booking' || currentHash === '#booking';
      const isBooking = newHash === '#/booking' || newHash === '#booking';

      setCurrentHash(newHash);

      // Only scroll to top if we switched views (between booking page and home page)
      // or if we explicitly went to the home page root (empty or '#')
      if (wasBooking !== isBooking || newHash === '' || newHash === '#') {
        // Disable smooth scroll temporarily for instant view transitions
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentHash]);

  // Smooth scroll to section anchors on hash change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#/booking' && hash !== '#booking') {
      try {
        const element = document.querySelector(hash);
        if (element) {
          const timer = setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 50);
          return () => clearTimeout(timer);
        }
      } catch {
        console.error('Invalid selector:', hash);
      }
    }
  }, [currentHash]);

  const isBookingPage = currentHash === '#/booking' || currentHash === '#booking';

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (isBookingPage) return;

    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // Starts appearing when the 'about' section scrolls into/past the top of viewport (rect.top < 100)
        setShowBackToTop(rect.top < 100);
      } else {
        setShowBackToTop(window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBookingPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash && window.location.hash !== '#/booking' && window.location.hash !== '#booking') {
      window.history.pushState(null, '', ' ');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  return (
    <main className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans selection:bg-[#8E1C32]/30 overflow-x-clip">
      <AnimatePresence mode="wait">
        {!isBookingPage ? (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Scroll Sections */}
            <HeroSection />
            <MarqueeSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />

            {/* Contact Section/Footer */}
            <footer
              id="contact"
              className="bg-[#0C0C0C] py-20 px-6 text-center text-sm text-[#D7E2EA]/30 border-t border-[#D7E2EA]/10 relative z-10"
            >
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left">
                  <h3 className="hero-heading font-black text-3xl uppercase tracking-tight mb-2">
                    İLETİŞİME GEÇİN
                  </h3>
                  <p className="text-sm font-light text-[#D7E2EA]/60 max-w-sm">
                    Randevu almak, özel tasarım talepleriniz veya hizmetlerimiz hakkında bilgi edinmek için bizimle iletişime geçin.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <a
                    href="mailto:info@auranailart.studio"
                    className="text-[#D7E2EA] hover:text-[#A4163D] transition-colors duration-200 text-lg font-medium tracking-wide"
                  >
                    info@auranailart.studio
                  </a>
                  <p className="text-xs uppercase tracking-widest font-light text-[#D7E2EA]/40">
                    © {new Date().getFullYear()} AURA NAIL ART & STUDIO. TÜM HAKLARI SAKLIDIR.
                  </p>
                </div>
              </div>
            </footer>

            {/* Back To Top Button */}
            <AnimatePresence>
              {showBackToTop && !isBookingPage && (
                <motion.button
                  key="back-to-top"
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 20 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3.5 sm:p-4 rounded-full bg-[#0C0C0C]/80 border border-[#8E1C32]/30 text-[#D7E2EA] hover:text-white shadow-[0_4px_20px_rgba(142,28,50,0.25)] hover:shadow-[0_4px_25px_rgba(142,28,50,0.4)] backdrop-blur-md cursor-pointer transition-colors duration-300"
                  aria-label="Back to Top"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5 w-4.5 h-4.5"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="booking-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
