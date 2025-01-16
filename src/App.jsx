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

        <section id="contacto" className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Contacto</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
                <p className="text-lg space-y-4">
                  <span className="block">Quito, Ecuador</span>
                  <span className="block">+593 97 931 7579</span>
                  <span className="block">info@abogadosonlineecuador.com</span>
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-6">Horario de Atención</h3>
                <p className="text-lg space-y-2">
                  <span className="block">Lunes a Viernes</span>
                  <span className="block">9:00 AM - 6:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppButton />

        {showForm && <AppointmentForm onClose={() => setShowForm(false)} />}
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <ul className="flex flex-wrap justify-center md:justify-start gap-6">
                <li><a href="#servicios" className="hover:text-accent transition-colors">Servicios</a></li>
                <li><a href="#calculadora" className="hover:text-accent transition-colors">Calculadora</a></li>
                <li><a href="#faq" className="hover:text-accent transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
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
