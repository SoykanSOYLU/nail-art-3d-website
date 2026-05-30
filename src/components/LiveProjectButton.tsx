import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ onClick, href }) => {
  const className = "rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer block w-max";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        İncele
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      İncele
    </button>
  );
};

export default LiveProjectButton;
