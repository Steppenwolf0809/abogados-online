'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState('at-bottom');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Common services for quick search
  const commonServices = [
    { name: 'Poderes', path: '/documentos/poderes' },
    { name: 'Contratos', path: '/documentos/contratos' },
    { name: 'Declaraciones', path: '/documentos/declaraciones' },
    { name: 'Transferencia', path: '/documentos/transferencia' },
    { name: 'Promesa', path: '/documentos/promesa' },
    { name: 'Viaje', path: '/documentos/viaje' },
    { name: 'Calculadora Notarial', path: '/calculadoras/notarial' },
    { name: 'Calculadora Municipal', path: '/calculadoras/municipal' },
    { name: 'Calculadora Registro', path: '/calculadoras/registro' },
  ];

  // Filtered services based on search query
  const filteredServices = searchQuery.trim() === '' 
    ? [] 
    : commonServices.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  useEffect(() => {
    // Focus search input when search is opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const headerHeight = 80;
      
      // Always fixed at top after initial load
      if (scrollY < 50) {
        setHeaderState('at-bottom');
      } 
      // When scrolled to the next section
      else if (scrollY < viewportHeight - headerHeight) {
        setHeaderState('transitioning');
      } 
      // When scrolled further down
      else {
        setHeaderState('fixed-top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && 
          searchInputRef.current && 
          !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header 
      className={`left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm fixed top-0
        ${headerState === 'at-bottom' ? 'bg-brand-600/50' : 
          headerState === 'transitioning' ? 'bg-brand-600/70' : 
          'bg-brand-600/90 shadow-md'}`}
      onClick={(e) => {
        // Prevent clicks on the header from bubbling up
        e.stopPropagation();
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow via-yellow to-yellow"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center relative h-10"
              onClick={(e) => {
                // Prevent default only if we're in mobile view and menu is open
                if (window.innerWidth < 768 && isMenuOpen) {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }
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
            
            {/* Search button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-white/80 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
              aria-label="Buscar servicios"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
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
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 text-white hover:text-white/80"
              aria-expanded={isMenuOpen ? "true" : "false"}
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

      {/* Search overlay */}
      <div 
        className={`absolute top-full left-0 right-0 bg-brand-600/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isSearchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar servicios, documentos, calculadoras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {filteredServices.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.path}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-x-0 top-[5rem] transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          // Prevent clicks on the menu from bubbling up
          e.stopPropagation();
        }}
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
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200 flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Calculadora</span>
              <span className="px-1.5 py-0.5 text-xs bg-yellow text-brand-700 rounded-md font-bold">PRO</span>
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-3 text-base font-medium text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="px-4 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contacto';
                  setIsMenuOpen(false);
                }}
                className="group block w-full text-center py-3 text-base font-medium text-white border-2 border-white hover:bg-white hover:text-brand rounded-xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                Agendar Cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
