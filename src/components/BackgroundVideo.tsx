import React from 'react';

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

export default function BackgroundVideo({ src, className = '' }: BackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>
  );
}
