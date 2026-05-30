import React from 'react';
import { motion } from 'framer-motion';

type MotionTag = 'div' | 'nav' | 'section' | 'header' | 'footer' | 'p' | 'span' | 'h1' | 'h2' | 'h3';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: MotionTag;
  className?: string;
}

// Map common tags to motion components statically to avoid recreation on every render
const motionComponents: Record<MotionTag, React.ComponentType<React.ComponentProps<typeof motion.div>>> = {
  div: motion.div,
  nav: motion.nav,
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
}) => {
  // Use static component reference or fallback if tag is not mapped
  const MotionComponent = motionComponents[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;
