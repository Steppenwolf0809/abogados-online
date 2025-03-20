'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState('at-bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const headerHeight = 80;
      
      if (scrollY < 50) {
        setHeaderState('at-bottom');
      } 
      else if (scrollY < viewportHeight - headerHeight) {
        setHeaderState('transitioning');
      } 
      else {
        setHeaderState('fixed-top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks and touches outside the menu to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!isMenuOpen) return;
      
      const target = event.target as HTMLElement;
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
      
      if (isOutsideMenu && isOutsideButton) {
        setIsMenuOpen(false);
      }
    };

    // Add both mouse and touch event listeners
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm fixed top-0
        ${headerState === 'at-bottom' ? 'bg-brand-600/50' : 
          headerState === 'transitioning' ? 'bg-brand-600/70' : 
          'bg-brand-600/90 shadow-md'}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow via-yellow to-yellow"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center relative h-10">
              <Image
                src={headerState === 'at-bottom' ? 
                  "/brand/Logo/Logo - Imágenes/Logo horizontal/Logo horizontal.png" : 
                  "/brand/Logo/Logo - Imágenes/Logo horizontal/Logo horizontal blanco.png"}
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
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group"
            >
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/calculadoras"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group flex items-center"
            >
              <span className="relative">
                Calculadora
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow text-brand-700 rounded-md font-bold">PRO</span>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link
              href="/contacto"
              className="group px-6 py-2.5 text-sm font-medium text-white border-2 border-white hover:bg-white hover:text-brand-600 rounded-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              Agendar Cita
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 text-white hover:text-white/80"
              onClick={toggleMenu}
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
        ref={menuRef}
        className={`fixed inset-x-0 top-16 transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-brand-600/95 backdrop-blur-lg shadow-soft-xl">
          <div className="px-4 py-6 space-y-4">
            <a
              href="/servicios"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="/calculadoras"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200 flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Calculadora</span>
              <span className="px-1.5 py-0.5 text-xs bg-yellow text-brand-700 rounded-md font-bold">PRO</span>
            </a>
            <a
              href="/blog"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <div className="px-4 pt-2">
              <a
                href="/contacto"
                className="group block w-full text-center py-3 text-base font-medium text-white border-2 border-white hover:bg-white hover:text-brand rounded-xl transition-all duration-300 relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
