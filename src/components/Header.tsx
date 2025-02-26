'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight - 80; // Height of hero section minus header height
      
      // Only consider scrolled when we've scrolled past the hero section
      setIsScrolled(scrollPosition > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-0 bg-brand-600/90 shadow-md' 
          : 'bottom-0 bg-brand-600/50'
      } backdrop-blur-sm`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow via-yellow to-yellow"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center relative h-10">
              <Image
                src="/brand/Logo/Logo - Imágenes/Logo horizontal/Logo horizontal blanco.png"
                alt="Abogados Online Ecuador"
                width={180}
                height={36}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/servicios"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200"
            >
              Servicios
            </Link>
            <Link
              href="/calculadoras"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200"
            >
              Calculadoras
            </Link>
            <Link
              href="/contacto"
              className="group px-6 py-2.5 text-sm font-medium text-white border-2 border-white hover:bg-white hover:text-brand rounded-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 text-white hover:text-white/80"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-x-0 top-[5rem] transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="bg-brand-600/95 backdrop-blur-lg shadow-soft-xl">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/servicios"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/calculadoras"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Calculadoras
            </Link>
            <div className="px-4 pt-2">
              <Link
                href="/contacto"
                className="group block w-full text-center py-3 text-base font-medium text-white border-2 border-white hover:bg-white hover:text-brand rounded-xl transition-all duration-300 relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
