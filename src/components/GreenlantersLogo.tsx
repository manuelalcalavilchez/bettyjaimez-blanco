import React from 'react';
interface BrandLogoProps { className?: string; size?: number; allowUpload?: boolean; }
export const GreenlantersLogo: React.FC<BrandLogoProps> = ({ className = '', size = 58 }) => (
  <div className={`flex items-center select-none ${className}`} aria-label="BettyJaimez Blanco">
    <svg width={size} height={size} viewBox="0 0 100 100" role="img">
      <defs><linearGradient id="bjb-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#D98B73"/><stop offset="55%" stopColor="#F2C6B5"/><stop offset="100%" stopColor="#B96D59"/></linearGradient></defs>
      <circle cx="50" cy="50" r="47" fill="#F7F0E8" stroke="#244536" strokeWidth="3"/>
      <path d="M13 63 Q30 47 45 58 T87 51 L87 76 Q66 67 50 75 T13 73Z" fill="#244536"/>
      <g fill="url(#bjb-g)" stroke="#A85E4D" strokeWidth="1.2"><ellipse cx="50" cy="22" rx="8" ry="15"/><ellipse cx="50" cy="78" rx="8" ry="15"/><ellipse cx="22" cy="50" rx="15" ry="8"/><ellipse cx="78" cy="50" rx="15" ry="8"/><ellipse cx="30" cy="30" rx="8" ry="14" transform="rotate(-45 30 30)"/><ellipse cx="70" cy="30" rx="8" ry="14" transform="rotate(45 70 30)"/><ellipse cx="30" cy="70" rx="8" ry="14" transform="rotate(45 30 70)"/><ellipse cx="70" cy="70" rx="8" ry="14" transform="rotate(-45 70 70)"/></g>
      <circle cx="50" cy="50" r="9" fill="#D8A62A"/><text x="50" y="54" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#244536">BJB</text>
    </svg>
  </div>
);