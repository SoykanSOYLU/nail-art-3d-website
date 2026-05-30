import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, cubicBezier, type MotionValue } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';

import gif1 from '../assets/gifs/1.gif';
import gif2 from '../assets/gifs/2.gif';
import gif3 from '../assets/gifs/3.gif';
import gif4 from '../assets/gifs/4.gif';
import gif5 from '../assets/gifs/5.gif';
import gif6 from '../assets/gifs/6.gif';
import gif7 from '../assets/gifs/7.gif';
import gif8 from '../assets/gifs/8.gif';
import gif9 from '../assets/gifs/9.gif';

const PROJECTS = [
  {
    num: '01',
    category: 'Özel Tasarım',
    name: 'Gelin Nail Art',
    images: [gif1, gif2, gif3],
  },
  {
    num: '02',
    category: 'Protez Tırnak',
    name: 'Trend Jel Sistem',
    images: [gif4, gif5, gif6],
  },
  {
    num: '03',
    category: 'El & Ayak Bakımı',
    name: 'Medikal Pedikür',
    images: [gif7, gif8, gif9],
  },
  {
    num: '04',
    category: 'Tırnak Tasarımı',
    name: 'Kalıcı Oje Tasarım',
    images: [gif2, gif5, gif8],
  },
  {
    num: '05',
    category: 'Tırnak Bakımı',
    name: 'Jel Tırnak Güçlendirme',
    images: [gif3, gif6, gif1],
  },
  {
    num: '06',
    category: 'Kozmetik & Makyaj',
    name: 'Profesyonel Makyaj',
    images: [gif4, gif7, gif2],
  },
  {
    num: '07',
    category: 'Güzellik & Bakım',
    name: 'Kirpik Laminasyon',
    images: [gif5, gif8, gif9],
  },
];

interface CardProps {
  index: number;
  totalCards: number;
  num: string;
  category: string;
  name: string;
  images: string[];
  progress: MotionValue<number>;
  windowHeight: number;
}

const ProjectCard: React.FC<CardProps> = ({
  index,
  totalCards,
  num,
  category,
  name,
  images,
  progress,
  windowHeight,
}) => {
  // Premium cubic-bezier easing curve
  const ease = cubicBezier(0.25, 0.46, 0.45, 0.94);

  // Divide the scroll progress [0, 0.8] into N-1 segments and append 1.0 for rest
  const inputPoints = Array.from({ length: totalCards }, (_, k) =>
    totalCards > 1 ? (k * 0.8) / (totalCards - 1) : 0.8
  ).concat(1.0);

  // Dynamic stackOffset: 45px for 3 cards, 25px for 5 cards to prevent bottom overflow
  const stackOffset = totalCards > 5 ? 15 : (totalCards > 3 ? 25 : 45);
  const activePosition = (totalCards - 1) * stackOffset;

  // y values grow UPWARDS: active card is always at activePosition (e.g. 90px), older cards push up
  const yOutputs = inputPoints.map((_, k) => {
    if (k === totalCards) return activePosition - (totalCards - 1 - index) * stackOffset; // final point (1.0)
    return k < index ? windowHeight * 0.85 : activePosition - (k - index) * stackOffset;
  });

  // Scale down values (very subtle for depth)
  const scaleOutputs = inputPoints.map((_, k) => {
    if (k === totalCards) return 1.0 - (totalCards - 1 - index) * 0.03; // final point (1.0)
    return k < index ? 1.0 : 1.0 - (k - index) * 0.03;
  });

  // Opacity values (fade out cards as they recede into the background, ensuring active card stays at 1.0)
  const opacityOutputs = inputPoints.map((_, k) => {
    if (k < index) return 0.0;
    if (k === index || k === index + 1) return 1.0;
    if (k === totalCards) return 1.0 - (totalCards - 1 - index) * 0.10;
    return 1.0 - (k - 1 - index) * 0.10;
  });

  // Generate blur values (soft blur older cards as they recede, keeping active card sharp at 0px)
  const blurOutputs = inputPoints.map((_, k) => {
    if (k < index) return 0;
    if (k === index || k === index + 1) return 0;
    if (k === totalCards) return (totalCards - 1 - index) * 3;
    return (k - 1 - index) * 3;
  });

  // Easing arrays for segment transitions
  const easeArray = Array(inputPoints.length - 1).fill(ease);

  const yVal = useTransform(progress, inputPoints, yOutputs, { ease: easeArray });
  const scaleVal = useTransform(progress, inputPoints, scaleOutputs, { ease: easeArray });
  const opacityVal = useTransform(progress, inputPoints, opacityOutputs, { ease: easeArray });
  const blurVal = useTransform(progress, inputPoints, blurOutputs, { ease: easeArray });

  const filterVal = useTransform(blurVal, (v: number) => (v > 0 ? `blur(${v}px)` : 'none'));

  return (
    <motion.div
      style={{
        y: yVal,
        scale: scaleVal,
        opacity: opacityVal,
        filter: filterVal,
        zIndex: index,
        willChange: 'transform, opacity, filter',
      }}
      className="absolute inset-x-0 top-0 w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl h-[60vh] max-h-[640px] min-h-[380px] sm:min-h-[440px] md:min-h-[480px]"
    >
      {/* Top Row: Number, Category, Name & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Huge Number */}
          <span
            className="font-black text-[#D7E2EA] leading-none select-none shrink-0"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 100px)' }}
          >
            {num}
          </span>
          {/* Category / Name stack */}
          <div className="flex flex-col text-left">
            <span className="text-[#D7E2EA] opacity-60 uppercase font-light tracking-widest text-xs sm:text-sm">
              {category}
            </span>
            <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-lg sm:text-2xl md:text-3xl mt-0.5 sm:mt-1">
              {name}
            </h3>
          </div>
        </div>

        {/* Action button */}
        <LiveProjectButton />
      </div>

      {/* Bottom Row: 2-Column Image Grid */}
      <div className="flex flex-row w-full gap-3 sm:gap-4 md:gap-6 items-stretch flex-1 overflow-hidden">
        {/* Left Column (40% Width) - Stack of 2 images */}
        <div className="w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6 justify-between">
          <img
            src={images[0]}
            alt={`${name} preview 1`}
            loading="lazy"
            className="w-full object-cover rounded-[20px] sm:rounded-[35px] md:rounded-[45px] lg:rounded-[60px] flex-1"
            style={{ maxHeight: 'calc(50% - 8px)' }}
          />
          <img
            src={images[1]}
            alt={`${name} preview 2`}
            loading="lazy"
            className="w-full object-cover rounded-[20px] sm:rounded-[35px] md:rounded-[45px] lg:rounded-[60px] flex-[1.2]"
            style={{ maxHeight: 'calc(50% - 8px)' }}
          />
        </div>

        {/* Right Column (60% Width) - 1 Tall Image */}
        <div className="w-[60%] flex">
          <img
            src={images[2]}
            alt={`${name} preview 3`}
            loading="lazy"
            className="w-full object-cover rounded-[20px] sm:rounded-[35px] md:rounded-[45px] lg:rounded-[60px] h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWindowHeight(window.innerHeight);
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Sync all cards under a single scroll trigger on the parent container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalHeight = 100 + (PROJECTS.length - 1) * 60;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 w-full relative z-10 select-none"
      style={{ height: `${totalHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-start max-w-5xl mx-auto pt-4 sm:pt-6 pb-4 px-5 sm:px-8 md:px-10 overflow-hidden">
        {/* Section Heading */}
        <h2
          className="hero-heading font-black uppercase text-center mb-1 sm:mb-2 leading-[1.15] tracking-tight shrink-0 py-1"
          style={{ fontSize: 'clamp(2rem, 6.2vw, 85px)' }}
        >
          Uygulamalarımız
        </h2>

        {/* Stacking Cards Viewport Wrapper */}
        <div className="relative flex-1 w-full max-w-4xl mx-auto h-[60vh] max-h-[640px] min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.num}
              index={index}
              totalCards={PROJECTS.length}
              num={project.num}
              category={project.category}
              name={project.name}
              images={project.images}
              progress={scrollYProgress}
              windowHeight={windowHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
