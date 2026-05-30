import React, { useState, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';

const SERVICES = [
  {
    num: '01',
    name: 'Protez Tırnak',
    desc: 'Kendi tırnağınızın üzerine özel koruyucu jellerle uygulanan, tırnak uzatma ve şekillendirme işlemidir. Son derece dayanıklı, pürüzsüz ve estetik bir görünüm kazandırır.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    icon: '💅'
  },
  {
    num: '02',
    name: 'Nail Art (Tırnak Sanatı)',
    desc: 'Tırnaklarınızı birer mini tuval gibi kullanarak yapılan, tamamen size özel, el çizimi sanatsal desenler, soyut çizgiler ve modern tasarımlar.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    icon: '✨'
  },
  {
    num: '03',
    name: 'Kalıcı Oje',
    desc: 'Özel UV/LED ışınları altında kurutulan, haftalarca soyulmadan ve parlaklığını kaybetmeden ilk günkü gibi kalan modern oje uygulaması.',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop&q=80',
    icon: '🌟'
  },
  {
    num: '04',
    name: 'Medikal Manikür',
    desc: 'Tırnak ve tırnak etlerinin sağlığını korumaya yönelik, tamamen sterilize edilmiş profesyonel freze cihazları ile yapılan derinlemesine hijyenik bakım.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop&q=80',
    icon: '🌸'
  },
  {
    num: '05',
    name: 'Güçlendirme & Bakım',
    desc: 'Zayıf, kolay kırılan ve soyulan tırnakları güçlendirip yapılandırmak, nemsizliği gidermek ve sağlıklı uzamalarını desteklemek için uygulanan özel kürler.',
    image: 'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?w=800&auto=format&fit=crop&q=80',
    icon: '💧'
  },
];

const renderIcon = (iconName: string) => {
  const className = "w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110";
  switch(iconName) {
    case '💅':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8 2 8 6 8 8v12c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V8c0-2 0-6-4-6Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 8c0-3 1.5-4 2.5-4s2.5 1 2.5 4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10c-.5-1-1.5-1-2-1m14 1c.5-1 1.5-1 2-1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="m5 4.5 1.5 1.5m11.5-1.5L16.5 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case '✨':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 14c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15c.2 1 .7 1.5 1.5 1.7-1 .2-1.5.7-1.7 1.5-.2-1-.7-1.5-1.5-1.7 1-.2 1.5-.7 1.7-1.5Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case '🌟':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2h4v8h-4z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-9z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15c2.5 1.5 5.5-1.5 10 0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case '🌸':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M12 3c-4 4-6 8-6 11.5a6 6 0 0 0 12 0c0-3.5-2-7.5-6-11.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14.5c.5-1.5 2-3 4-4m-4 7c1-1.5 3-2 5-2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case '💧':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21a9 9 0 0 1-9-9c0-5 9-10 9-10s9 5 9 10a9 9 0 0 1-9 9Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v6M9.5 10.5h5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    if (windowWidth < 640) {
      setHoveredIndex(hoveredIndex === idx ? null : idx);
    }
  };

  const isDesktop = windowWidth >= 640;
  const isAnyHovered = hoveredIndex !== null;

  // Compute flex value for each card via inline style so CSS transition works
  const getCardFlex = (idx: number): number => {
    if (!isAnyHovered) return 1;
    return hoveredIndex === idx ? 5 : 0.5;
  };

  const transitionStyle: React.CSSProperties = {
    transition: 'flex 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease, transform 500ms ease',
  };

  return (
    <section
      id="services"
      className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full text-center relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="text-[#0C0C0C] font-black uppercase mb-4 leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6.8vw, 95px)' }}
          >
            Hizmetlerimiz
          </h2>
          <p className="text-[#0C0C0C] opacity-60 font-light max-w-xl mx-auto mb-12 sm:mb-16 md:mb-20 text-sm sm:text-base md:text-lg">
            Güzelliğinizi ve sağlığınızı ön planda tutan, uzman kadromuz tarafından uygulanan özel hizmet seçeneklerimiz.
          </p>
        </FadeIn>

        {/* Services Accordion Slider */}
        <FadeIn delay={0.15} y={40} className="w-full">
          <div
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-5xl mx-auto"
            style={{ height: isDesktop ? '520px' : '700px' }}
          >
            {SERVICES.map((s, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={s.num}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => handleCardClick(idx)}
                  className="group relative rounded-[32px] sm:rounded-[40px] overflow-hidden cursor-pointer shadow-lg"
                  style={{
                    flex: `${getCardFlex(idx)} 1 0%`,
                    minWidth: isDesktop ? '80px' : undefined,
                    minHeight: !isDesktop ? '72px' : undefined,
                    ...transitionStyle,
                  }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${s.image})`,
                      transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(to top, rgba(12,12,12,0.88) 0%, rgba(12,12,12,0.35) 50%, transparent 100%)'
                        : 'rgba(12,12,12,0.4)',
                      transition: 'background 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />

                  {/* Large Number at the top */}
                  <div
                    className="absolute top-6 sm:top-8 select-none pointer-events-none"
                    style={{
                      left: isHovered ? (isDesktop ? '32px' : '24px') : '50%',
                      transform: isHovered ? 'translateX(0)' : 'translateX(-50%)',
                      transition: 'left 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <span
                      className="font-black text-xl sm:text-2xl"
                      style={{
                        color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)',
                        transition: 'color 500ms ease',
                      }}
                    >
                      {s.num}
                    </span>
                  </div>

                  {/* Circular Badge */}
                  <div
                    className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#0C0C0C] flex items-center justify-center shadow-xl shrink-0 select-none z-10"
                    style={{
                      left: isHovered ? (isDesktop ? '32px' : '24px') : '50%',
                      bottom: isHovered ? (isDesktop ? '32px' : '24px') : (isDesktop ? '24px' : '8px'),
                      transform: isHovered ? 'translateX(0)' : 'translateX(-50%)',
                      transition: 'left 700ms cubic-bezier(0.4, 0, 0.2, 1), bottom 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms ease, color 300ms ease',
                    }}
                  >
                    {renderIcon(s.icon)}
                  </div>

                  {/* Text details (fades/slides in when expanded) */}
                  <div
                    className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-left"
                    style={{
                      left: isDesktop ? '112px' : '96px',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
                      pointerEvents: isHovered ? 'auto' : 'none',
                      transition: isHovered
                        ? 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1) 650ms, transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 650ms'
                        : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    }}
                  >
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                      {s.name}
                    </h3>
                    <p className="text-white/70 font-light text-[0.75rem] sm:text-xs md:text-sm leading-relaxed mt-1 max-w-sm sm:max-w-md line-clamp-2 md:line-clamp-none">
                      {s.desc}
                    </p>
                    <a
                      href="#/booking"
                      className="text-[#D7E2EA] hover:text-white text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider mt-2.5 hover:underline transition-colors w-max block"
                    >
                      Hemen Randevu Al &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
