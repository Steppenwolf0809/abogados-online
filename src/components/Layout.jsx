import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import WhatsAppButton from './WhatsAppButton';
import ScrollProgress from './ScrollProgress';
import AppointmentForm from './AppointmentForm';

const Layout = ({ children }) => {
  const [showForm, setShowForm] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    // Manejar el scroll a secciones cuando cambia la ubicación
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <ScrollProgress />
      <Header onShowForm={() => setShowForm(true)} />

      <main className="min-h-screen bg-white pt-16">
        {children}
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <ul className="flex flex-wrap justify-center md:justify-start gap-6">
                <li><a href="/#servicios" className="hover:text-accent transition-colors" onClick={() => setShowForm(false)}>Servicios</a></li>
                <li><a href="/calculadoras" className="hover:text-accent transition-colors" onClick={() => setShowForm(false)}>Calculadoras</a></li>
                <li><a href="/#faq" className="hover:text-accent transition-colors" onClick={() => setShowForm(false)}>Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Abogados Online Ecuador. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      {showForm && <AppointmentForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Layout;
