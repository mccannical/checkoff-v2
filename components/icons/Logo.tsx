import React from 'react';

const Logo = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex items-center gap-2" {...props}>
    <svg
      width="32"
      height="32"
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
