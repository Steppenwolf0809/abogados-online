'use client';

import React from 'react';
import Image from 'next/image';
import Header from './Header';

export default function HeroSection() {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-500/95 mix-blend-multiply pointer-events-none" />
      </div>
      
      <div className="flex-grow flex items-center justify-center pt-32">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="animate-scaleIn">
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

      <div className="relative z-20">
        <Header />
      </div>
    </div>
  );
}
