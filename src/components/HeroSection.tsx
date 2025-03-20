'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from './Header';
import ScrollIndicator from './ScrollIndicator';
import Link from 'next/link';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts to trigger animations
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex flex-col overflow-hidden">
      {/* SEO-friendly heading that's visually hidden */}
      <h1 className="sr-only">Abogados Online Ecuador - Servicios Notariales y Legales en Ecuador</h1>
      
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
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl transform scale-105"></div>
              <Image
                src="/brand/Logo/Logo - Imágenes/Logo con slogan/Logo con slogan.png"
                alt="Abogados Online Ecuador"
                width={800}
                height={400}
                className="relative mx-auto w-auto h-auto max-w-[90%] sm:max-w-[800px] drop-shadow-lg"
                priority
              />
            </div>
            
            {/* Tagline with SEO-friendly text */}
            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto font-light">
              Servicios notariales y legales en línea en Ecuador. Trámites rápidos y eficientes.
            </p>
            
            {/* CTA Buttons - Improved responsiveness and brand consistency */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto px-4">
              <Link 
                href="/servicios" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-brand-600 rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-100 hover:scale-105 transform flex justify-center items-center"
              >
                Ver Servicios
              </Link>
              <Link 
                href="/calculadoras#notarial" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-yellow text-brand-800 rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow/90 hover:scale-105 transform flex justify-center items-center"
              >
                Calcular Costos
              </Link>
              <Link 
                href="/contacto" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-brand-600 text-white rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-700 hover:scale-105 transform flex justify-center items-center"
              >
                Agendar Cita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

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
