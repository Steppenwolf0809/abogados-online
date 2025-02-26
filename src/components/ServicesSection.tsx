'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  featured?: boolean;
  badge?: string;
}

const services: Service[] = [
  {
    id: 'documentos-ai',
    title: 'Generación de Documentos',
    description: 'Creación de documentos legales personalizados con tecnología de inteligencia artificial.',
    icon: '/icons/contratos.svg',
    link: '/servicios/documentos-ai',
    featured: true,
    badge: 'Nuevo'
  },
  {
    id: 'compraventas',
    title: 'Compraventas',
    description: 'Asesoría y gestión completa en procesos de compraventa de bienes inmuebles.',
    icon: '/icons/transferencia.svg',
    link: '/servicios/compraventas',
    featured: true
  },
  {
    id: 'promesas',
    title: 'Promesas de Compraventa',
    description: 'Documentos legales para asegurar transacciones inmobiliarias futuras.',
    icon: '/icons/promesa.svg',
    link: '/servicios/promesas'
  },
  {
    id: 'poderes',
    title: 'Poderes',
    description: 'Poderes generales y especiales para representación legal en diversos trámites.',
    icon: '/icons/poderes.svg',
    link: '/servicios/poderes'
  },
  {
    id: 'posesiones',
    title: 'Posesiones Efectivas',
    description: 'Trámites de sucesión y posesión efectiva de bienes hereditarios.',
    icon: '/icons/declaraciones.svg',
    link: '/servicios/posesiones'
  },
  {
    id: 'salidas',
    title: 'Salidas del País',
    description: 'Autorizaciones y permisos legales para viajes internacionales de menores.',
    icon: '/icons/viaje.svg',
    link: '/servicios/salidas'
  }
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-700 bg-brand-100 rounded-full mb-3">Servicios Notariales</span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Soluciones Legales a su Alcance
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos servicios notariales y legales de alta calidad para proteger sus intereses y facilitar sus trámites
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollAnimation 
              key={service.id} 
              animation="slideUp" 
              delay={index * 100}
              className="h-full"
            >
              <div className="relative h-full group">
                {service.badge && (
                  <span className="absolute -top-2 -right-2 z-10 px-2 py-1 text-xs font-semibold text-white bg-yellow rounded-full">
                    {service.badge}
                  </span>
                )}
                <Link
                  href={service.link}
                  className={`block h-full overflow-hidden rounded-2xl transition-all duration-300 ${
                    service.featured 
                      ? 'bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-white text-gray-900 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200'
                  }`}
                >
                  <div className="p-8">
                    <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-6 ${
                      service.featured ? 'bg-white/20' : 'bg-brand-50'
                    }`}>
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={28}
                        height={28}
                        className={`h-7 w-7 ${service.featured ? 'text-white' : 'text-brand-600'}`}
                      />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform ${
                      service.featured ? 'text-white' : 'text-gray-900'
                    }`}>
                      {service.title}
                    </h3>
                    
                    <p className={`${
                      service.featured ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className={`mt-6 flex items-center font-medium ${
                      service.featured ? 'text-white' : 'text-brand-600'
                    }`}>
                      <span className="mr-2">Saber más</span>
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
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation animation="fadeIn" delay={300}>
          <div className="mt-16 text-center">
            <Link 
              href="/servicios"
              className="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-base font-medium rounded-full text-brand-600 bg-white hover:bg-brand-50 transition-colors duration-300"
            >
              Ver todos nuestros servicios
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
