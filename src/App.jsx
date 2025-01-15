import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import NotaryCalculator from './components/NotaryCalculator';
import FAQ from './components/FAQ';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollProgress from './components/ScrollProgress';
import AppointmentForm from './components/AppointmentForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onShowForm={() => setShowForm(true)} />

      <main className="min-h-screen bg-white pt-16">
        <HeroSection onShowForm={() => setShowForm(true)} />
        
        <section id="calculadora" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Calculadora de Costos Notariales
            </h2>
            <NotaryCalculator />
          </div>
        </section>

        <section id="servicios" className="py-16 bg-white">
          <ServicesSection />
        </section>

        <section id="faq" className="py-16 bg-gray-50">
          <FAQ />
        </section>

        <WhatsAppButton />

        {showForm && <AppointmentForm onClose={() => setShowForm(false)} />}
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div id="contacto">
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p className="text-sm">
                Quito, Ecuador<br />
                +593 999 266 015<br />
                info@abogadosonlineecuador.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horario de Atención</h3>
              <p className="text-sm">
                Lunes a Viernes<br />
                8:00 AM - 6:00 PM
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#servicios" className="hover:text-accent transition-colors">Servicios</a></li>
                <li><a href="#calculadora" className="hover:text-accent transition-colors">Calculadora</a></li>
                <li><a href="#faq" className="hover:text-accent transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-sm">
              © {new Date().getFullYear()} Abogados Online Ecuador. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
