import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onShowForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);

  // Add debug log function
  const addLog = (message) => {
    console.log(`[Header Debug] ${message}`);
    setDebugLogs(prev => [...prev, `${new Date().toISOString()} - ${message}`]);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    addLog(`Scroll to section: ${id}`);
    
    if (!isHomePage) {
      addLog(`Not home page, redirecting to /#${id}`);
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      addLog(`Scrolled to element ${id}`);
    } else {
      addLog(`Element ${id} not found`);
    }
    setIsMobileMenuOpen(false);
  };

  // Prevent default navigation for links
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    addLog(`Link clicked: ${href}`);
    window.location.href = href;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white shadow-md py-3' 
        : 'bg-primary/95 py-4'
    }`}>
      {/* Texto de prueba para verificar despliegue */}
      <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs z-50">
        PRUEBA JSX - V2 - 21/03/2025
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/"
            className="flex-shrink-0 transition-transform duration-500 hover:opacity-90"
            onClick={(e) => {
              e.preventDefault();
              addLog('Logo clicked');
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.location.href = '/';
              }
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
                onClick={(e) => {
                  addLog(`Desktop nav item clicked: ${item.name}`);
                  if (item.type === 'scroll') {
                    scrollToSection(item.id);
                  } else if (item.type === 'link') {
                    handleLinkClick(e, item.href);
                  }
                }}
                className={`relative font-medium ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-blue-600 transition-colors duration-300`}
              >
                {item.type === 'link' ? (
                  <span className="text-blue-600 hover:text-blue-700">
                    {item.name}
                  </span>
                ) : (
                  item.name
                )}
              </button>
            ))}
            <button
              onClick={(e) => {
                addLog('Agendar Cita button clicked');
                onShowForm();
              }}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addLog(`Mobile menu button clicked, current state: ${isMobileMenuOpen}`);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
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
        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-black/40 backdrop-blur-sm rounded-lg mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-3 space-y-2">
              {[
                { id: 'servicios', name: 'Servicios', type: 'scroll' },
                { id: 'calculadoras', name: 'Calculadoras', type: 'link', href: '/calculadoras' },
                { id: 'contacto', name: 'Contacto', type: 'scroll' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.type === 'link' ? item.href : `/#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    addLog(`Mobile menu item clicked: ${item.name}`);
                    if (item.type === 'scroll') {
                      scrollToSection(item.id);
                    } else if (item.type === 'link') {
                      window.location.href = item.href;
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
                    <span className="text-blue-600 hover:text-blue-700">
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                </a>
              ))}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addLog('Mobile menu: Agendar Cita clicked');
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
              </a>
            </div>
          </div>
        )}
      </div>
      
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
};

export default Header;
