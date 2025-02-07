import React, { useState, useEffect } from 'react';

const AdaptiveVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    // Precargar el video
    const video = document.createElement('video');
    if (iOS) {
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
    }
    
    const loadVideo = () => {
      video.oncanplay = () => setIsVideoLoaded(true);
      video.onerror = (e) => {
        console.error('Video error:', e);
        setVideoError(true);
      };
      
      // Intentar primero con WebM
      video.src = '/videos/hero-background.webm';
      video.onerror = () => {
        // Si WebM falla, intentar con MP4
        video.src = '/videos/hero-background.mp4';
      };
    };

    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo);
      return () => window.removeEventListener('load', loadVideo);
    }
  }, []);

  const renderGradientBackground = () => (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-animated"></div>
      <div className="absolute inset-0 bg-pattern opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E4C]/60 via-[#0A1E4C]/40 to-transparent"></div>
      
      {/* Efectos de luz */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-blue-500/10 blur-[100px] transform -rotate-12 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#BF9B30]/5 blur-[100px] transform rotate-12 animate-float-delayed"></div>
    </div>
  );

  const renderVideo = () => (
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        poster="/brand/Logo/Logo - Imágenes/Logo con slogan/Logo con slogan.png"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
        onError={(e) => {
          console.error('Video error:', e);
          setVideoError(true);
        }}
      >
        <source src="/videos/hero-background.webm" type="video/webm" />
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E4C]/40 via-[#0A1E4C]/30 to-transparent"></div>
    </div>
  );

  return (
    <>
      {/* Siempre mostramos el gradiente como base */}
      {renderGradientBackground()}
      
      {/* Mostramos el video encima si está disponible */}
      {!videoError && isVideoLoaded && renderVideo()}
    </>
  );
};

export default AdaptiveVideo;
