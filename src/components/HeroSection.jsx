import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/button';
import AdaptiveVideo from './AdaptiveVideo';

const HeroSection = ({ onShowForm }) => {

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      <AdaptiveVideo />
      
      {/* Contenido */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
        <div className="text-center max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Trámites Notariales
            <span className="block text-accent mt-2 drop-shadow-lg">Simplificados</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed">
            Ahorra tiempo y dinero con nuestra calculadora de costos en tiempo real y asesoría profesional personalizada
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/calculadoras">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Calculadoras de Costos
              </Button>
            </Link>
            <Button 
              onClick={onShowForm}
              className="bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white text-xl px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Consulta Gratuita
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform hover:-translate-y-1 transition-all duration-200 border border-white/10 hover:border-accent/30">
              <div className="text-4xl font-bold text-accent mb-2">10+</div>
              <div className="text-gray-100 font-medium">Años de Experiencia Legal</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform hover:-translate-y-1 transition-all duration-200 border border-white/10 hover:border-accent/30">
              <div className="text-4xl font-bold text-accent mb-2">30%</div>
              <div className="text-gray-100 font-medium">Ahorro Promedio</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform hover:-translate-y-1 transition-all duration-200 border border-white/10 hover:border-accent/30">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-100 font-medium">Soporte Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent"></div>
    </div>
  );
};

export default HeroSection;
