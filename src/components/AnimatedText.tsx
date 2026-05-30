import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element with specified offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.22em]">
            {wordChars.map((char, charIndex) => {
              const currentIndex = charCounter;
              charCounter++;

              // Overlapping scroll ranges: each character fades in over 8% scroll distance
              const start = currentIndex / totalChars;
              const end = Math.min(1, start + 0.08);

              return (
                <Character
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block select-none">
      {/* Invisible placeholder for layout preservation */}
      <span className="opacity-20 text-[#D7E2EA]">{char}</span>
      {/* Scroll-animated span */}
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 text-[#D7E2EA] pointer-events-none"
      >
        {char}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
