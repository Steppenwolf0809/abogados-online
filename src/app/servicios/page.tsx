'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 'poderes',
    title: 'Poderes',
    description: 'Poderes generales y especiales para personas naturales y jurídicas.',
    icon: '/icons/poderes.svg',
  },
  {
    id: 'declaraciones',
    title: 'Declaraciones Juramentadas',
    description: 'Declaraciones bajo juramento para diversos trámites legales.',
    icon: '/icons/declaraciones.svg',
  },
  {
    id: 'contratos',
    title: 'Contratos',
    description: 'Elaboración y certificación de contratos de todo tipo.',
    icon: '/icons/contratos.svg',
  },
  {
    id: 'transferencia',
    title: 'Transferencia de Dominio',
    description: 'Compraventa de bienes inmuebles y vehículos.',
    icon: '/icons/transferencia.svg',
  },
  {
    id: 'promesa',
    title: 'Promesa de Compraventa',
    description: 'Contratos de promesa para bienes inmuebles.',
    icon: '/icons/promesa.svg',
  },
  {
    id: 'viaje',
    title: 'Autorización de Viaje',
    description: 'Permisos de salida del país para menores de edad.',
    icon: '/icons/viaje.svg',
  },
];

export default function ServiciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Nuestros Servicios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <Link
                  href={`/servicios/${service.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver más detalles →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transparencia Total
            </h3>
            <p className="text-gray-600">
              Conoce el costo exacto de tu trámite antes de iniciarlo con nuestras calculadoras en línea.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Atención Inmediata
            </h3>
            <p className="text-gray-600">
              Respuesta rápida a través de WhatsApp y asesoría personalizada para tu caso.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Experiencia Comprobada
            </h3>
            <p className="text-gray-600">
              Años de experiencia en trámites notariales y legales en Ecuador.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Listo para empezar?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Contáctanos ahora para recibir asesoría personalizada sobre tu trámite notarial.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculadoras"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Calcular Costos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
