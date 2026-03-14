import React from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

const Logo = ({ width, height, className, ...props }: LogoProps) => (
  <div className={`flex items-center gap-2 ${className || ''}`} {...props}>
    <svg
      width={width || '32'}
      height={height || '32'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" rx="8" fill="#6366f1" />
      <path
        d="M9 16L14 21L23 11"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    <span className="text-xl font-bold text-white">Checkoff</span>
  </div>
);

export default Logo;
