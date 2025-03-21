'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState('at-bottom');
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Add debug log function
  const addLog = (message: string) => {
    console.log(`[Header Debug] ${message}`);
    setDebugLogs(prev => [...prev, `${new Date().toISOString()} - ${message}`]);
  };

  // Display logs in console on update
  useEffect(() => {
    if (debugLogs.length > 0) {
      console.log('=== HEADER DEBUG LOGS ===');
      debugLogs.forEach(log => console.log(log));
      console.log('========================');
    }
  }, [debugLogs]);

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

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        addLog(`Click outside detected: ${event.target}`);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    };
  }, [isMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling
    addLog(`Menu button clicked, current state: ${isMenuOpen}`);
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
            <a
              href="/"
              className="flex items-center relative h-10"
              onClick={(e) => {
                addLog('Logo clicked');
              }}
            >
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
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a
              href="/servicios"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group"
            >
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/calculadoras"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group flex items-center"
            >
              <span className="relative">
                Calculadora
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow text-brand-700 rounded-md font-bold">PRO</span>
            </a>
            <a
              href="/blog"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="/contacto"
              className="group px-6 py-2.5 text-sm font-medium text-white border-2 border-white hover:bg-white hover:text-brand-600 rounded-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              Agendar Cita
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
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
      {isMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 bg-brand-600/95 backdrop-blur-lg shadow-soft-xl md:hidden"
          onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the menu
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="/servicios"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => {
                addLog('Mobile menu: Servicios link clicked');
                setIsMenuOpen(false); // Close menu after click
              }}
            >
              Servicios
            </a>
            <a
              href="/calculadoras"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200 flex items-center justify-between"
              onClick={() => {
                addLog('Mobile menu: Calculadoras link clicked');
                setIsMenuOpen(false); // Close menu after click
              }}
            >
              <span>Calculadora</span>
              <span className="px-1.5 py-0.5 text-xs bg-yellow text-brand-700 rounded-md font-bold">PRO</span>
            </a>
            <a
              href="/blog"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => {
                addLog('Mobile menu: Blog link clicked');
                setIsMenuOpen(false); // Close menu after click
              }}
            >
              Blog
            </a>
            <div className="px-4 pt-2">
              <a
                href="/contacto"
                className="group block w-full text-center py-3 text-base font-medium text-white border-2 border-white hover:bg-white hover:text-brand rounded-xl transition-all duration-300 relative overflow-hidden"
                onClick={() => {
                  addLog('Mobile menu: Contacto link clicked');
                  setIsMenuOpen(false); // Close menu after click
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Debug panel - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-2 max-h-32 overflow-y-auto z-50">
          <h4 className="font-bold">Header Debug Logs:</h4>
          <ul>
            {debugLogs.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
