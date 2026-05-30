import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate, type MotionValue, type PanInfo } from 'framer-motion';

const STAFF_MEMBERS = [
  { id: 'Şukufe', name: 'Şukufe Çelik', role: 'Nail Art Uzmanı', initial: 'ŞÇ' },
  { id: 'buse', name: 'Buse Demir', role: 'Protez Tırnak Uzmanı', initial: 'BD' },
  { id: 'selin', name: 'Selin Kaya', role: 'Medikal Manikür Uzmanı', initial: 'SK' },
  { id: 'any', name: 'Fark Etmez / İlk Boş Uzman', role: 'İlk Uygun Uzman', initial: 'FE' },
];

const SERVICES = [
  { id: 'protez', name: 'Protez Tırnak', duration: '90 dk', price: '₺750', desc: 'Jel sistem ile tırnak uzatma ve güçlendirme', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop&q=80' },
  { id: 'nailart', name: 'Nail Art (Tırnak Sanatı)', duration: '60 dk', price: '₺450', desc: 'Tamamen el çizimi özgün sanatsal desenler', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80' },
  { id: 'kalici', name: 'Kalıcı Oje', duration: '45 dk', price: '₺350', desc: 'UV ışınlı, haftalarca kalıcı parlaklık', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500&auto=format&fit=crop&q=80' },
  { id: 'manikur', name: 'Medikal Manikür', duration: '40 dk', price: '₺300', desc: 'Steril freze cihazları ile derinlemesine bakım', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&auto=format&fit=crop&q=80' },
  { id: 'bakim', name: 'Güçlendirme & Bakım', duration: '30 dk', price: '₺250', desc: 'Zayıf tırnaklar için özel kürler', image: 'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?w=500&auto=format&fit=crop&q=80' },
];

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00'
];

interface ServiceCardProps {
  s: typeof SERVICES[0];
  idx: number;
  dragXSpring: MotionValue<number>;
  spacing: number;
  radius: number;
  baseOffset: number;
  rotateMultiplier: number;
  activeServiceIndex: number;
  setActiveServiceIndex: (idx: number) => void;
  handleSelectService: (id: string) => void;
  dragX: MotionValue<number>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  s,
  idx,
  dragXSpring,
  spacing,
  radius,
  baseOffset,
  rotateMultiplier,
  activeServiceIndex,
  setActiveServiceIndex,
  handleSelectService,
  dragX
}) => {
  const translateX = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    const rad = d * rotateMultiplier * (Math.PI / 180);
    // Circular horizontal mapping: X = R * sin(theta)
    return radius * Math.sin(rad);
  });

  const translateZ = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    const rad = d * rotateMultiplier * (Math.PI / 180);
    // Circular depth mapping: Z = R * cos(theta) - R - offset
    return radius * Math.cos(rad) - radius - baseOffset;
  });

  const rotateY = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    return d * rotateMultiplier;
  });

  const scale = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    const absD = Math.abs(d);
    // Center card is closest and largest.
    return 1.0 - Math.min(0.2, absD * 0.08);
  });

  const opacity = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    const absD = Math.abs(d);
    return 1 - Math.min(0.4, absD * 0.15);
  });

  const zIndex = useTransform(dragXSpring, (val: number) => {
    const d = (idx * spacing + val) / spacing;
    const absD = Math.abs(d);
    return Math.round(100 - absD * 20);
  });

  const isSelected = activeServiceIndex === idx;

  return (
    <motion.div
      style={{
        transformStyle: 'preserve-3d',
        x: translateX,
        z: translateZ,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex
      }}
      onTap={() => {
        if (activeServiceIndex !== idx) {
          setActiveServiceIndex(idx);
          handleSelectService(s.id);
          animate(dragX, -idx * spacing, {
            type: 'spring',
            stiffness: 220,
            damping: 26
          });
        }
      }}
      className={`absolute w-[170px] sm:w-[200px] h-[250px] sm:h-[290px] rounded-[32px] overflow-hidden border cursor-pointer flex flex-col justify-end p-4 shadow-2xl transition-colors duration-300 ${isSelected
        ? 'border-[#A4163D] shadow-[0_0_20px_rgba(164,22,61,0.35)]'
        : 'border-white/5 hover:border-white/15'
        }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url(${s.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Minimal pill label at the bottom */}
      <div className="relative z-10 bg-[#0C0C0C]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 self-center mb-1 text-center shadow-lg pointer-events-none select-none">
        <span className="text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-[#D7E2EA]">
          {s.name}
        </span>
      </div>
    </motion.div>
  );
};

export const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [activeServiceIndex, setActiveServiceIndex] = useState(2);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'kalici',
    staff: '',
    date: '',
    timeSlot: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Magnetic pull translation values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const translateX = useSpring(cardX, springConfig);
  const translateY = useSpring(cardY, springConfig);

  // Glow coordinates relative to the card's dimensions (0 to 100 percent)
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 40%)`);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate mouse position relative to center of card
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // Shift the card towards the mouse cursor (subtle attractive drift, reduced multiplier to 0.08)
    cardX.set(mouseX * 0.08);
    cardY.set(mouseY * 0.08);

    // Calculate percentage coords for the glow reflection
    const percentX = ((event.clientX - rect.left) / width) * 100;
    const percentY = ((event.clientY - rect.top) / height) * 100;
    glowX.set(percentX);
    glowY.set(percentY);
  };

  const handleMouseLeave = () => {
    // Spring back to center
    cardX.set(0);
    cardY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSelectService = (id: string) => {
    setFormData((prev) => ({ ...prev, service: id }));
    setError('');
  };

  const spacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 75 : 220;
  const radius = 450;
  const baseOffset = 30;
  const rotateMultiplier = 25;

  const dragX = useMotionValue(-activeServiceIndex * spacing);
  const dragXSpring = useSpring(dragX, { damping: 30, stiffness: 220 });
  const dragStart = useRef(0);

  const handlePanStart = () => {
    dragStart.current = dragX.get();
  };

  const handlePan = (_event: unknown, info: PanInfo) => {
    let newX = dragStart.current + info.offset.x;
    const minX = -(SERVICES.length - 1) * spacing;
    const maxX = 0;

    if (newX > maxX) {
      newX = maxX + (newX - maxX) * 0.35;
    } else if (newX < minX) {
      newX = minX + (newX - minX) * 0.35;
    }

    dragX.set(newX);
  };

  const handlePanEnd = (_event: unknown, info: PanInfo) => {
    const currentX = dragX.get();
    const velocityX = info.velocity.x;
    let nearestIndex = Math.round(-currentX / spacing);

    if (velocityX < -500) {
      nearestIndex = Math.ceil(-currentX / spacing);
    } else if (velocityX > 500) {
      nearestIndex = Math.floor(-currentX / spacing);
    }

    const clampedIndex = Math.max(0, Math.min(SERVICES.length - 1, nearestIndex));

    animate(dragX, -clampedIndex * spacing, {
      type: 'spring',
      stiffness: 220,
      damping: 26
    });

    setActiveServiceIndex(clampedIndex);
    handleSelectService(SERVICES[clampedIndex].id);
  };

  const handleSelectStaff = (id: string) => {
    setFormData((prev) => ({ ...prev, staff: id }));
    setError('');
  };

  const handleSelectTime = (time: string) => {
    setFormData((prev) => ({ ...prev, timeSlot: time }));
    setError('');
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.service) {
        setError('Lütfen bir hizmet seçin.');
        return;
      }
      if (!formData.staff) {
        setError('Lütfen bir uzman seçin.');
        return;
      }
    } else if (step === 2) {
      if (!formData.date) {
        setError('Lütfen bir randevu tarihi seçin.');
        return;
      }
      if (!formData.timeSlot) {
        setError('Lütfen bir randevu saati seçin.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Lütfen adınızı ve soyadınızı giriniz.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Lütfen telefon numaranızı giriniz.');
      return;
    }
    setIsSubmitted(true);
  };

  const selectedService = SERVICES.find(s => s.id === formData.service);
  const selectedStaff = STAFF_MEMBERS.find(s => s.id === formData.staff);

  // Formatting date for ticket
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return 'SEÇİLMEDİ';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' }).toUpperCase();
  };

  return (
    <section className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] px-4 sm:px-8 md:px-12 py-10 md:py-16 flex flex-col justify-start items-center w-full select-none overflow-x-hidden relative">

      {/* Immersive Background Blur Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#8E1C32]/8 blur-[100px] sm:blur-[160px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] left-[-5%] w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full bg-[#A4163D]/5 blur-[100px] sm:blur-[160px] pointer-events-none z-0"
      />

      {/* Top Header Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center z-10 mb-8 sm:mb-12">
        <a
          href="#/"
          className="text-[#D7E2EA] font-semibold uppercase tracking-widest text-xs sm:text-sm hover:text-[#A4163D] transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Anasayfa
        </a>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#D7E2EA]/20 hidden sm:block"></span>
          <span className="text-[#D7E2EA]/40 text-xs sm:text-sm uppercase tracking-widest font-light">
            AURA NAIL VIP REZERVASYON
          </span>
        </div>
      </div>

      {/* Main Grid: Left 3D Ticket, Right Form Wizard */}
      <div className="w-full max-w-6xl z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* LEFT COLUMN: 3D Holographic Booking Ticket (Takes 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center h-full pt-2 lg:pt-12">

          {/* Animated wrapper to tilt the Ticket */}
          <div className="perspective-[1000px] w-full max-w-[380px] flex flex-col items-center">
            <motion.div
              style={{
                x: translateX,
                y: translateY,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[2/3] rounded-[30px] sm:rounded-[36px] bg-[#111]/70 border border-[#D7E2EA]/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Holographic Dynamic Gloss effect */}
              <motion.div
                style={{
                  background: glowBg,
                }}
                className="absolute inset-0 pointer-events-none z-10"
              />

              {/* Glowing internal gold outline */}
              <div className="absolute inset-[8px] rounded-[24px] sm:rounded-[30px] border border-[#8E1C32]/20 pointer-events-none z-0" />

              {/* Ticket Top: Brand Info */}
              <div className="w-full flex justify-between items-start z-10">
                <div className="flex flex-col">
                  <span className="text-[0.6rem] tracking-widest text-[#D7E2EA]/50 uppercase">
                    STUDIO
                  </span>
                </div>
                <div className="px-3 py-1 bg-[#8E1C32]/20 rounded-full border border-[#8E1C32]/30">
                  <span className="text-[0.6rem] font-bold text-[#A4163D] tracking-wider uppercase">
                    VIP PASS
                  </span>
                </div>
              </div>

              {/* Ticket Center: User choices */}
              <div className="flex flex-col gap-6 sm:gap-8 z-10 w-full">

                {/* Name */}
                <div className="flex flex-col text-left">
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Rezervasyon Sahibi</span>
                  <span className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#D7E2EA] truncate mt-1 min-h-[28px]">
                    {formData.fullName || 'MISAFIR'}
                  </span>
                </div>

                {/* Service */}
                <div className="flex flex-col text-left border-t border-[#D7E2EA]/10 pt-4">
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Seçilen Hizmet</span>
                  <span className="text-base sm:text-lg font-semibold uppercase tracking-wide text-[#A4163D] mt-1 truncate min-h-[24px]">
                    {selectedService?.name || 'HİZMET SEÇİLMEDİ'}
                  </span>
                  {selectedService && (
                    <span className="text-xs text-[#D7E2EA]/50 mt-0.5">
                      Süre: {selectedService.duration} | Tutar: {selectedService.price}
                    </span>
                  )}
                </div>

                {/* Specialist */}
                <div className="flex flex-col text-left border-t border-[#D7E2EA]/10 pt-4">
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Tasarım Uzmanı</span>
                  <span className="text-sm sm:text-base font-semibold text-[#D7E2EA]/90 mt-1 min-h-[20px]">
                    {selectedStaff?.name || 'UZMAN SEÇİLMEDİ'}
                  </span>
                </div>
              </div>

              {/* Ticket Bottom: Date/Time Stamp */}
              <div className="w-full flex flex-col gap-3 z-10 border-t border-[#D7E2EA]/10 pt-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-left">
                    <span className="text-[0.55rem] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Tarih</span>
                    <span className="text-[0.7rem] sm:text-xs font-bold text-[#D7E2EA] mt-0.5">
                      {getFormattedDate(formData.date)}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[0.55rem] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Saat</span>
                    <span className="text-[0.7rem] sm:text-xs font-bold text-[#A4163D] mt-0.5">
                      {formData.timeSlot || 'SEÇİLMEDİ'}
                    </span>
                  </div>
                </div>

                {/* Decorative barcode */}
                <div className="w-full flex flex-col gap-1 items-center mt-2 opacity-30 select-none">
                  <div className="h-6 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#D7E2EA_2px,#D7E2EA_4px,transparent_4px,transparent_8px,#D7E2EA_8px,#D7E2EA_9px)]" />
                  <span className="text-[0.5rem] tracking-[0.4em] font-light">VIP-RESERVATION-STAMP</span>
                </div>
              </div>

            </motion.div>

            {/* Perspective reflection shadow below ticket */}
            <div className="w-[80%] h-4 bg-black/40 blur-[10px] rounded-full mt-6 select-none pointer-events-none" />
            <span className="text-xs text-[#D7E2EA]/30 tracking-wider mt-2 hidden lg:block text-center uppercase font-light">
              * Kartı hareket ettirmek için üzerine gelin
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Step Wizard (Takes 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-start w-full">

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col"
              >

                {/* Step indicator header */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <span className="text-xs font-bold text-[#A4163D] tracking-widest uppercase">
                    ADIM 0{step} / 03
                  </span>
                  <div className="flex-1 h-px bg-[#D7E2EA]/10">
                    <motion.div
                      layoutId="progress-bar"
                      style={{ width: `${(step / 3) * 100}%` }}
                      className="h-full bg-[#A4163D]"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-[#8E1C32]/10 border border-[#8E1C32]/30 text-[#D7E2EA] text-sm text-center font-medium">
                    {error}
                  </div>
                )}

                {/* STEP 1: SERVICE & STAFF */}
                {step === 1 && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-left tracking-tight mb-2">
                        Uygulama ve Uzman Tercihi
                      </h2>
                      <p className="text-sm font-light text-[#D7E2EA]/55 text-left mb-6">
                        Yaptırmak istediğiniz tırnak tasarım hizmetini seçin.
                      </p>
                    </div>

                    {/* 3D Cylinder Curved Services Carousel */}
                    <div className="relative w-full flex items-center justify-center py-4 px-2">
                      {/* Left Navigation Arrow */}
                      <button
                        type="button"
                        onClick={() => {
                          const newIdx = Math.max(0, activeServiceIndex - 1);
                          setActiveServiceIndex(newIdx);
                          handleSelectService(SERVICES[newIdx].id);
                          animate(dragX, -newIdx * spacing, {
                            type: 'spring',
                            stiffness: 220,
                            damping: 26
                          });
                        }}
                        disabled={activeServiceIndex === 0}
                        className="absolute left-[-5px] sm:left-[-15px] z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Carousel viewport wrapper */}
                      <motion.div
                        onPanStart={handlePanStart}
                        onPan={handlePan}
                        onPanEnd={handlePanEnd}
                        className="relative w-full h-[350px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
                        style={{ perspective: '1000px' }}
                      >
                        <div className="relative w-[180px] h-[290px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                          {SERVICES.map((s, idx) => (
                            <ServiceCard
                              key={s.id}
                              s={s}
                              idx={idx}
                              dragXSpring={dragXSpring}
                              spacing={spacing}
                              radius={radius}
                              baseOffset={baseOffset}
                              rotateMultiplier={rotateMultiplier}
                              activeServiceIndex={activeServiceIndex}
                              setActiveServiceIndex={setActiveServiceIndex}
                              handleSelectService={handleSelectService}
                              dragX={dragX}
                            />
                          ))}
                        </div>
                      </motion.div>

                      {/* Right Navigation Arrow */}
                      <button
                        type="button"
                        onClick={() => {
                          const newIdx = Math.min(SERVICES.length - 1, activeServiceIndex + 1);
                          setActiveServiceIndex(newIdx);
                          handleSelectService(SERVICES[newIdx].id);
                          animate(dragX, -newIdx * spacing, {
                            type: 'spring',
                            stiffness: 220,
                            damping: 26
                          });
                        }}
                        disabled={activeServiceIndex === SERVICES.length - 1}
                        className="absolute right-[-5px] sm:right-[-15px] z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Staff selection grid */}
                    <div className="flex flex-col gap-3 mt-4">
                      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">
                        Hizmeti Verecek Uzman
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {STAFF_MEMBERS.map((member) => {
                          const isSelected = formData.staff === member.id;
                          return (
                            <button
                              key={member.id}
                              type="button"
                              onClick={() => handleSelectStaff(member.id)}
                              className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${isSelected
                                ? 'bg-[#A4163D]/10 border-[#A4163D] shadow-[0_0_15px_rgba(164,22,61,0.15)]'
                                : 'bg-[#121212]/50 border-[#D7E2EA]/10 hover:border-[#D7E2EA]/20'
                                }`}
                            >
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${isSelected ? 'bg-[#A4163D] text-white' : 'bg-[#D7E2EA]/15 text-[#D7E2EA]'
                                }`}>
                                {member.initial}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs sm:text-sm font-bold leading-tight text-[#D7E2EA]">{member.name}</span>
                                <span className="text-[0.65rem] text-[#D7E2EA]/40 mt-0.5">{member.role}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DATE & TIME */}
                {step === 2 && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-left tracking-tight mb-2">
                        Tarih ve Saat Seçimi
                      </h2>
                      <p className="text-sm font-light text-[#D7E2EA]/55 text-left mb-6">
                        Uygulamanın gerçekleştirileceği tarihi ve size en uygun saat dilimini belirleyin.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                      {/* Date Select Panel (Takes 6 cols) */}
                      <div className="sm:col-span-6 flex flex-col gap-3">
                        <label htmlFor="date" className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">Tarih Seçimi</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          min={new Date().toISOString().split('T')[0]} // block past dates
                          onChange={handleChange}
                          className="w-full bg-[#121212]/50 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:border-[#A4163D] text-[#D7E2EA] cursor-pointer"
                        />
                        <div className="p-4 rounded-2xl bg-[#121212]/30 border border-[#D7E2EA]/5 text-[0.75rem] text-left text-[#D7E2EA]/50 font-light leading-relaxed mt-2">
                          Seçeceğiniz tarihe göre o güne ait boş saat dilimleri yan panelde güncellenecektir. Pazar günleri kapalıyız.
                        </div>
                      </div>

                      {/* Time Slot Select Panel (Takes 6 cols) */}
                      <div className="sm:col-span-6 flex flex-col gap-3">
                        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">Müsait Saat Dilimleri</span>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => {
                            const isSelected = formData.timeSlot === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleSelectTime(time)}
                                className={`py-3 rounded-xl border text-center font-bold text-xs transition-all duration-200 ${isSelected
                                  ? 'bg-[#A4163D] border-[#A4163D] text-white shadow-[0_0_12px_rgba(164,22,61,0.3)]'
                                  : 'bg-[#121212]/50 border-[#D7E2EA]/10 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/20'
                                  }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT & CONFIRM */}
                {step === 3 && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-left tracking-tight mb-2">
                        Kişisel Bilgiler & Onay
                      </h2>
                      <p className="text-sm font-light text-[#D7E2EA]/55 text-left mb-6">
                        Rezervasyonunuzu onaylamamız için iletişim bilgilerinizi giriniz.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">Ad Soyad *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Adınızı ve soyadınızı girin"
                          className="bg-[#121212]/50 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:border-[#A4163D] text-[#D7E2EA]"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">Telefon Numarası *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0 (555) 555 55 55"
                          className="bg-[#121212]/50 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:border-[#A4163D] text-[#D7E2EA]"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="notes" className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 text-left font-semibold">Ek Not / Tasarım Talebi</label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tırnak şekli, nail art çizim istekleri veya özel talepleriniz..."
                          className="bg-[#121212]/50 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:border-[#A4163D] text-[#D7E2EA] resize-none"
                        />
                      </div>
                    </form>
                  </div>
                )}

                {/* Navigation Buttons Row */}
                <div className="flex gap-4 w-full mt-8 sm:mt-12 justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-[#D7E2EA]/75 hover:bg-[#D7E2EA]/5 font-bold uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer block flex-1 text-center"
                    >
                      Geri
                    </button>
                  ) : (
                    <a
                      href="#/"
                      className="rounded-full border-2 border-[#D7E2EA]/20 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 font-bold uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer block flex-1 text-center"
                    >
                      İptal Et
                    </a>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{
                        background: 'linear-gradient(135deg, #2A050B 0%, #8E1C32 60%, #4A0815 100%)',
                        boxShadow: '0 4px 12px rgba(142, 28, 50, 0.25)',
                      }}
                      className="rounded-full text-white font-bold uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer block flex-1 text-center border border-[#8E1C32]/30 shadow-lg"
                    >
                      Devam Et
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      style={{
                        background: 'linear-gradient(135deg, #1C0509 0%, #6B1124 50%, #8E1C32 100%)',
                        boxShadow: '0 4px 14px rgba(142, 28, 50, 0.4), inset 0 0 10px rgba(255,255,255,0.1)',
                      }}
                      className="rounded-full text-white font-bold uppercase tracking-widest px-10 py-4 text-xs sm:text-sm outline outline-2 outline-white -outline-offset-[3px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer block flex-1 text-center shadow-2xl"
                    >
                      Talebi Gönder
                    </button>
                  )}
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', damping: 25 }}
                className="w-full bg-[#121212]/60 backdrop-blur-xl border border-[#D7E2EA]/10 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 text-center flex flex-col items-center shadow-2xl"
              >
                {/* Success Badge */}
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 mb-6 shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="hero-heading font-black uppercase text-2xl sm:text-3xl tracking-tight mb-4">
                  Rezervasyon Talebiniz Alındı!
                </h2>
                <p className="text-[#D7E2EA]/70 font-light text-xs sm:text-sm mb-6 max-w-md">
                  Aura ekibi olarak talebinizi aldık. En kısa sürede telefon numaranız üzerinden arayarak randevunuzu kesinleştireceğiz.
                </p>

                {/* Summary ticket */}
                <div className="w-full bg-black/40 rounded-2xl p-5 mb-8 text-left flex flex-col gap-3 text-xs sm:text-sm border border-[#D7E2EA]/5">
                  <div className="flex justify-between items-center border-b border-[#D7E2EA]/5 pb-2">
                    <span className="text-[#D7E2EA]/40 uppercase tracking-widest text-[0.65rem]">Müşteri</span>
                    <span className="font-semibold text-[#D7E2EA]">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#D7E2EA]/5 pb-2">
                    <span className="text-[#D7E2EA]/40 uppercase tracking-widest text-[0.65rem]">Hizmet</span>
                    <span className="font-semibold text-[#A4163D]">{selectedService?.name} ({selectedService?.duration})</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#D7E2EA]/5 pb-2">
                    <span className="text-[#D7E2EA]/40 uppercase tracking-widest text-[0.65rem]">Uzman</span>
                    <span className="font-semibold text-[#D7E2EA]">{selectedStaff?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#D7E2EA]/40 uppercase tracking-widest text-[0.65rem]">Tarih ve Saat</span>
                    <span className="font-bold text-[#A4163D]">{getFormattedDate(formData.date)} - {formData.timeSlot}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <a
                    href="#/"
                    className="rounded-full border-2 border-[#D7E2EA]/20 text-[#D7E2EA] font-semibold uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer block flex-1 text-center"
                  >
                    Anasayfaya Dön
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        phone: '',
                        service: 'kalici',
                        staff: '',
                        date: '',
                        timeSlot: '',
                        notes: '',
                      });
                      setActiveServiceIndex(2);
                      dragX.set(-2 * spacing);
                      setStep(1);
                      setIsSubmitted(false);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #2A050B 0%, #8E1C32 60%, #4A0815 100%)',
                    }}
                    className="rounded-full text-white font-semibold uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer block flex-1 border border-[#8E1C32]/25"
                  >
                    Yeni Rezervasyon
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
};

export default BookingPage;
