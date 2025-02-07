import React, { useState, useEffect } from 'react';

const BackgroundVideo = () => {
  const [videoError, setVideoError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  if (videoError) {
    return (
      <>
        {/* Gradiente animado como fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 animate-gradient"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:40px_40px] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse"></div>
      </>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        poster="/brand/Logo/Logo - Imágenes/Logo con slogan/Logo con slogan.png"
        className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover opacity-70"
        style={{ maxHeight: '100vh' }}
        onError={(e) => {
          console.error('Video error:', e);
          setVideoError(true);
        }}
      >
        <source src="/videos/hero-background.webm" type="video/webm" />
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E4C]/60 via-[#0A1E4C]/50 to-transparent"></div>
    </div>
  );
};

export default BackgroundVideo;
