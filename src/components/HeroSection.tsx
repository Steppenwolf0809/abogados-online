'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from './Header';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts to trigger animations
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-500/95 mix-blend-multiply pointer-events-none transition-opacity duration-1500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        
        {/* Animated particles/shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 mix-blend-overlay"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                transform: 'translate(-50%, -50%)',
                animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center pt-32">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div 
            className={`transition-all duration-1000 transform ${
              isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <Image
              src="/brand/Logo/Logo - Imágenes/Logo con slogan/Logo con slogan.png"
              alt="Abogados Online Ecuador"
              width={800}
              height={400}
              className="mx-auto w-auto h-auto max-w-[90%] sm:max-w-[800px] drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Header is positioned at the bottom of hero section */}
      <div className="relative z-20">
        <Header />
      </div>
      
      {/* Add floating animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
