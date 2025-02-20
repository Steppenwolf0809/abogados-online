import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/testimonials/TestimonialsSection';
import FAQ from './components/FAQ';

function App() {
  return (
    <Layout>
      <HeroSection />
      
      <section id="servicios" className="py-16 bg-white">
        <ServicesSection />
      </section>

      <section id="testimonios" className="py-16 bg-gray-50">
        <TestimonialsSection />
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

      <Analytics />
    </Layout>
  );
}

export default App;
