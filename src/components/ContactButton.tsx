import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.hash = '#/booking';
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'linear-gradient(123deg, #1C0509 7%, #6B1124 37%, #8E1C32 72%, #4A0815 100%)',
        boxShadow: '0px 4px 14px rgba(107, 17, 36, 0.35), inset 4px 4px 12px #8E1C32',
      }}
      className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline outline-2 outline-white -outline-offset-[3px] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer block w-max"
    >
      İletişime Geç
    </button>
  );
};

export default ContactButton;
