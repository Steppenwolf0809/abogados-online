'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const calculadoras = [
  {
    id: 'notarial',
    title: 'Calculadora Notarial',
    description: 'Calcula los costos notariales para diferentes trámites como transferencias de dominio, poderes, declaraciones juramentadas y más.',
    icon: '/icons/contratos.svg',
    link: '/calculadoras',
    color: 'brand',
  },
  {
    id: 'municipal',
    title: 'Impuestos Municipales',
    description: 'Estima los impuestos municipales aplicables a transferencias de dominio, incluyendo alcabalas y plusvalía.',
    icon: '/icons/transferencia.svg',
    link: '/calculadoras',
    color: 'yellow',
  },
  {
    id: 'registro',
    title: 'Registro de la Propiedad',
    description: 'Calcula los aranceles de inscripción del Registro de la Propiedad para tus trámites.',
    icon: '/icons/promesa.svg',
    link: '/calculadoras',
    color: 'brand',
  },
];

export default function CalculadorasSection() {
  return (
    <section id="calculadoras" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-700 bg-brand-100 rounded-full mb-3">Herramientas Gratuitas</span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Calculadoras de Costos
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas para calcular costos notariales, impuestos municipales y tasas de registro de la propiedad
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculadoras.map((calculadora, index) => (
            <ScrollAnimation 
              key={calculadora.id} 
              animation="slideUp" 
              delay={index * 100}
              className="h-full"
            >
              <Link
                href={calculadora.link}
                className={`block h-full overflow-hidden rounded-2xl transition-all duration-300 bg-white border border-gray-100 shadow-md hover:shadow-xl group`}
              >
                <div className={`h-3 w-full bg-${calculadora.color}-500`}></div>
                <div className="p-8">
                  <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-6 bg-${calculadora.color}-50 group-hover:bg-${calculadora.color}-100 transition-colors`}>
                    <Image
                      src={calculadora.icon}
                      alt={calculadora.title}
                      width={32}
                      height={32}
                      className={`h-8 w-8 text-${calculadora.color}-600`}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-600 transition-colors">
                    {calculadora.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {calculadora.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center font-medium text-brand-600">
                    <span className="mr-2">Calcular ahora</span>
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation animation="fadeIn" delay={300}>
          <div className="mt-12 text-center">
            <Link 
              href="/calculadoras"
              className="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-base font-medium rounded-full text-brand-600 bg-white hover:bg-brand-50 transition-colors duration-300"
            >
              Ver todas las calculadoras
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
