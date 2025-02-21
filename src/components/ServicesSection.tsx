import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const services: Service[] = [
  {
    id: 'poderes',
    title: 'Poderes',
    description: 'Poderes generales y especiales para trámites específicos.',
    icon: '/icons/poderes.svg',
    link: '/servicios/poderes'
  },
  {
    id: 'declaraciones',
    title: 'Declaraciones Juramentadas',
    description: 'Declaraciones bajo juramento para diversos propósitos.',
    icon: '/icons/declaraciones.svg',
    link: '/servicios/declaraciones'
  },
  {
    id: 'contratos',
    title: 'Contratos',
    description: 'Elaboración y certificación de contratos de todo tipo.',
    icon: '/icons/contratos.svg',
    link: '/servicios/contratos'
  },
  {
    id: 'promesas',
    title: 'Promesas de Compraventa',
    description: 'Documentos legales para transacciones inmobiliarias.',
    icon: '/icons/promesa.svg',
    link: '/servicios/promesas'
  },
  {
    id: 'transferencias',
    title: 'Transferencia de Dominio',
    description: 'Trámites para transferencia de bienes inmuebles.',
    icon: '/icons/transferencia.svg',
    link: '/servicios/transferencias'
  },
  {
    id: 'viajes',
    title: 'Permisos de Viaje',
    description: 'Autorizaciones para viajes de menores de edad.',
    icon: '/icons/viaje.svg',
    link: '/servicios/viajes'
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Ofrecemos una amplia gama de servicios notariales para satisfacer sus necesidades
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {service.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
