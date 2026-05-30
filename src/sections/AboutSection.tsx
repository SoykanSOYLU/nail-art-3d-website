import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import decorTopLeft from '../assets/randoms/about-top-left.png';
import decorBottomLeft from '../assets/randoms/about-bottom-left.png';
import decorTopRight from '../assets/randoms/about-top-right.png';
import decorBottomRight from '../assets/randoms/about-bottom-right.png';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-hidden w-full select-none"
    >
      {/* Absolute Decorative 3D Images */}
      {/* Top-Left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src={decorTopLeft}
            alt="3D Top Left Decor"
            className="w-full h-auto object-contain block select-none"
            draggable="false"
          />
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src={decorBottomLeft}
            alt="3D Bottom Left Decor"
            className="w-full h-auto object-contain block select-none"
            draggable="false"
          />
        </FadeIn>
      </div>

      {/* Top-Right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src={decorTopRight}
            alt="3D Top Right Decor"
            className="w-full h-auto object-contain block select-none"
            draggable="false"
          />
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src={decorBottomRight}
            alt="3D Bottom Right Decor"
            className="w-full h-auto object-contain block select-none"
            draggable="false"
          />
        </FadeIn>
      </div>

      {/* Centered content block with specified spacing */}
      <div className="flex flex-col items-center max-w-2xl text-center relative z-20">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2rem, 7.5vw, 110px)' }}
          >
            Hakkımızda
          </h2>
        </FadeIn>

        {/* Heading to Paragraph Spacing */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Paragraph */}
        <AnimatedText
          text="Beş yılı aşkın tasarım tecrübemizle, tırnak tasarımında sanatı ve zarafeti ön plana çıkarıyoruz. Kendini özel hissetmek ve tarzıyla fark yaratmak isteyen herkes için özgün, modern ve yenilikçi tasarımlar sunmaktan heyecan duyuyoruz. Gelin, tırnaklarınızı birlikte birer sanat eserine dönüştürelim!"
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[1rem] sm:text-[1.2vw] md:text-[1.35rem]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        {/* Paragraph to Button Spacing */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button */}
        <ContactButton />
      </div>
    </section>
  );
};

export default AboutSection;
