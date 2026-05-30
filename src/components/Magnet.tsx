import React, { useState, useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const elementRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = () => {
    if (elementRef.current) {
      rectRef.current = elementRef.current.getBoundingClientRect();
    }
  };

  useEffect(() => {
    // Cache the rect on mount, resize and scroll
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  useEffect(() => {
    let ticked = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!rectRef.current) {
        updateRect();
        if (!rectRef.current) return;
      }

      if (!ticked) {
        window.requestAnimationFrame(() => {
          const rect = rectRef.current;
          if (!rect) {
            ticked = false;
            return;
          }

          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          const distance = Math.hypot(distanceX, distanceY);

          // Check if cursor is within padding distance of the element bounds
          const triggerRadius = Math.max(rect.width, rect.height) / 2 + padding;

          if (distance < triggerRadius) {
            setTransition(activeTransition);
            setTransform({
              x: distanceX / strength,
              y: distanceY / strength,
            });
          } else {
            setTransition(inactiveTransition);
            setTransform({ x: 0, y: 0 });
          }
          ticked = false;
        });
        ticked = true;
      }
    };

    const handleMouseLeave = () => {
      setTransition(inactiveTransition);
      setTransform({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const el = elementRef.current;
    if (el) {
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mouseenter', updateRect);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) {
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mouseenter', updateRect);
      }
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
