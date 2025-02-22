'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const services = {
  poderes: {
    title: 'Poderes',
    description: 'Poderes generales y especiales para personas naturales y jurídicas.',
    icon: '/icons/poderes.svg',
    details: [
      'Poderes generales',
      'Poderes especiales',
      'Poderes mercantiles',
      'Revocatorias de poder'
    ]
  },
  declaraciones: {
    title: 'Declaraciones Juramentadas',
    description: 'Declaraciones bajo juramento para diversos trámites legales.',
    icon: '/icons/declaraciones.svg',
    details: [
      'Declaraciones de unión de hecho',
      'Declaraciones de ingresos',
      'Declaraciones de dependencia económica',
      'Declaraciones para trámites migratorios'
    ]
  },
  contratos: {
    title: 'Contratos',
    description: 'Elaboración y certificación de contratos de todo tipo.',
    icon: '/icons/contratos.svg',
    details: [
      'Contratos de compraventa',
      'Contratos de arrendamiento',
      'Contratos de trabajo',
      'Contratos de prestación de servicios'
    ]
  },
  transferencias: {
    title: 'Transferencia de Dominio',
    description: 'Compraventa de bienes inmuebles y vehículos.',
    icon: '/icons/transferencia.svg',
    details: [
      'Compraventa de inmuebles',
      'Compraventa de vehículos',
      'Donaciones',
      'Dación en pago'
    ]
  },
  promesas: {
    title: 'Promesa de Compraventa',
    description: 'Contratos de promesa para bienes inmuebles.',
    icon: '/icons/promesa.svg',
    details: [
      'Promesa de compraventa de inmuebles',
      'Promesa de compraventa de vehículos',
      'Promesa de permuta',
      'Promesa de donación'
    ]
  },
  viajes: {
    title: 'Autorización de Viaje',
    description: 'Permisos de salida del país para menores de edad.',
    icon: '/icons/viaje.svg',
    details: [
      'Autorización de viaje nacional',
      'Autorización de viaje internacional',
      'Autorización temporal',
      'Autorización permanente'
    ]
  }
};

export default function ServicioPage({ params }: { params: { id: string } }) {
  const service = services[params.id as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={service.icon}
          alt={service.title}
          width={64}
          height={64}
          className="w-16 h-16"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Servicios Incluidos</h2>
        <ul className="space-y-2">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
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
  );
}
