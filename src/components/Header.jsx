import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onShowForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Ensure mobile menu is closed after clicking
      setIsMobileMenuOpen(false);

      // Add a small delay to handle any dynamic content loading
      setTimeout(() => {
        const finalPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        if (Math.abs(window.pageYOffset - finalPosition) > 10) {
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white shadow-md py-3' 
        : 'bg-primary/95 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            className="flex-shrink-0 transition-transform duration-500 hover:opacity-90"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src={isScrolled 
                ? "/brand/Logo/Logo - Imágenes/Logo sin slogan/Logo sin slogan negro.png"
                : "/brand/Logo/Logo - Imágenes/Logo sin slogan/Logo sin slogan blanco.png"
              }
              alt="Abogados Online Ecuador"
              className={`transition-all duration-500 ${
                isScrolled 
                  ? 'h-14 w-auto' 
                  : 'h-16 w-auto'
              }`}
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: 'servicios', name: 'Servicios', type: 'scroll' },
              { id: 'calculadoras', name: 'Calculadoras', type: 'link', href: '/calculadoras' },
              { id: 'contacto', name: 'Contacto', type: 'scroll' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => item.type === 'scroll' && scrollToSection(item.id)}
                className={`relative font-medium ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-blue-600 transition-colors duration-300`}
              >
                {item.type === 'link' ? (
                  <Link 
                    to={item.href}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </button>
            ))}
            <button
              onClick={onShowForm}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
                  : 'bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white backdrop-blur-sm'
              }`}
            >
              Agendar Cita
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-800 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 bg-black/40 backdrop-blur-sm rounded-lg mt-2'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-3 space-y-2">
            {[
              { id: 'servicios', name: 'Servicios', type: 'scroll' },
              { id: 'calculadoras', name: 'Calculadoras', type: 'link', href: '/calculadoras' },
              { id: 'contacto', name: 'Contacto', type: 'scroll' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.type === 'scroll') {
                    scrollToSection(item.id);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-800 hover:bg-gray-50 hover:text-blue-600' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.type === 'link' ? (
                  <Link 
                    to={item.href}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </button>
            ))}
            <button
              onClick={() => {
                onShowForm();
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 font-medium transition-all duration-300 ${
                isScrolled
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-blue-600 bg-white/90 hover:bg-white'
              }`}
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
