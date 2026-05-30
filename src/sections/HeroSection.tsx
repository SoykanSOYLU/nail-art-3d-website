import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/ContactButton';
import logonail from '../assets/logos/logonail.png';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden w-full bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full px-6 md:px-10 pt-6 md:pt-8 z-20">
        <div className="flex justify-between items-center w-full">
          <a
            href="#about"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
          >
            Hakkımızda
          </a>
          <a
            href="#services"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
          >
            Hizmetlerimiz
          </a>
          <a
            href="#projects"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
          >
            Uygulamalar
          </a>
          <a
            href="#contact"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
          >
            İletişim
          </a>
          <a
            href="#/booking"
            style={{
              background: 'linear-gradient(135deg, #2A050B 0%, #8E1C32 60%, #4A0815 100%)',
              boxShadow: '0 4px 12px rgba(142, 28, 50, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.2)',
            }}
            className="text-white font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[1.1rem] hover:scale-105 active:scale-95 transition-all duration-300 px-5 py-2 sm:px-7 sm:py-2.5 rounded-full border border-[#8E1C32]/30 flex items-center justify-center cursor-pointer shadow-lg"
          >
            Randevu Al
          </a>
        </div>
      </FadeIn>

      {/* 2. Hero Heading (centered vertically in remaining space) */}
      <div className="flex-1 flex items-center justify-center w-full z-0 px-4">
        <div className="overflow-hidden w-full flex justify-center">
          <FadeIn delay={0.15} y={40} className="w-full text-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
              Aura Nail
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 3. Hero Portrait (absolute layer) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] bottom-0 pointer-events-none">
        <FadeIn delay={0.6} y={30} className="w-full h-full flex justify-center items-end">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full pointer-events-auto flex items-end justify-center"
          >
            <img
              src={logonail}
              alt="nakyoS Nail Art Logo"
              className="w-full h-auto object-contain block select-none"
              draggable="false"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end w-full z-20">
        {/* Left description */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-left"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Sıra dışı tasarımlar ve modern dokunuşlarla tırnaklarınızı sanata dönüştürüyoruz
          </p>
        </FadeIn>

        {/* Right action button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
