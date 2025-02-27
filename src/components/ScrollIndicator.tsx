'use client';

import React from 'react';

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-32 right-12 flex flex-col items-center animate-bounce">
      <span className="text-white text-sm font-medium mb-2">Scroll</span>
      <svg 
        className="w-6 h-6 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
};

export default ScrollIndicator;
