import React, { useRef, useEffect } from 'react';

import gif1 from '../assets/gifs/1.gif';
import gif2 from '../assets/gifs/2.gif';
import gif3 from '../assets/gifs/3.gif';
import gif4 from '../assets/gifs/4.gif';
import gif5 from '../assets/gifs/5.gif';
import gif6 from '../assets/gifs/6.gif';
import gif7 from '../assets/gifs/7.gif';
import gif8 from '../assets/gifs/8.gif';
import gif9 from '../assets/gifs/9.gif';

const IMAGES = [
  gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9,
  gif1, gif3, gif5, gif7, gif9, gif2, gif4, gif6, gif8
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticked = false;
    let isIntersecting = false;

    const handleScroll = () => {
      if (!isIntersecting) return;
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          const row1 = row1Ref.current;
          const row2 = row2Ref.current;
          if (section && row1 && row2) {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

            // Row 1: moves RIGHT on scroll (translate3d(offset - 200))
            row1.style.transform = `translate3d(${offset - 200}px, 0px, 0px)`;

            // Row 2: moves LEFT on scroll (translate3d(-(offset - 200)))
            row2.style.transform = `translate3d(${-(offset - 200)}px, 0px, 0px)`;
          }
          ticked = false;
        });
        ticked = true;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll(); // Trigger initial scroll position calculations
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { rootMargin: '100px 0px' } // Load/unload slightly outside viewport for seamless transitions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Row 1: first 9 images, tripled
  const row1Images = [...IMAGES.slice(0, 9), ...IMAGES.slice(0, 9), ...IMAGES.slice(0, 9)];
  // Row 2: remaining 9 images, tripled
  const row2Images = [...IMAGES.slice(9), ...IMAGES.slice(9), ...IMAGES.slice(9)];

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3 w-full"
    >
      {/* Row 1 (Moves Right) */}
      <div className="w-full overflow-hidden flex">
        <div ref={row1Ref} className="flex gap-3 will-change-transform select-none">
          {row1Images.map((src, idx) => (
            <img
              key={`row1-${idx}`}
              src={src}
              alt={`Design work preview ${idx + 1}`}
              loading="lazy"
              className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
              draggable="false"
            />
          ))}
        </div>
      </div>

      {/* Row 2 (Moves Left) */}
      <div className="w-full overflow-hidden flex">
        <div ref={row2Ref} className="flex gap-3 will-change-transform select-none">
          {row2Images.map((src, idx) => (
            <img
              key={`row2-${idx}`}
              src={src}
              alt={`Design work preview ${idx + 12}`}
              loading="lazy"
              className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
              draggable="false"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
