'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UnderConstructionProps {
  title: string;
  message?: string;
}

export default function UnderConstruction({ title, message }: UnderConstructionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <Image
          src="/icons/contratos.svg"
          alt="En construcción"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {message || "Esta funcionalidad está en desarrollo. Nuestra IA está siendo entrenada para ofrecerte el mejor servicio pronto."}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/servicios"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Ver otros servicios
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
