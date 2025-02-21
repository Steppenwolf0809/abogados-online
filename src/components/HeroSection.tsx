import React from 'react';
import Link from 'next/link';
import BackgroundVideo from './BackgroundVideo';

export default function HeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <BackgroundVideo
        src="/videos/hero-background.mp4"
        className="opacity-50"
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
          Trámites Notariales Simplificados
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
          Calculadora de costos en tiempo real y asesoría profesional personalizada
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculadoras"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
          >
            Calcular Costos
          </Link>
          
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:text-lg"
          >
            Ver Servicios
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}
