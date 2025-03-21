'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotariaAdSidebar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-brand-600 mb-3">
        Notaría recomendada en su zona
      </h3>
      
      <div className="relative w-full h-40 mb-3">
        <Image
          src="/images/notaria18-logo.jpg" // Asegúrate de tener esta imagen
          alt="Notaría 18 - Dra. Glenda Zapata Silva"
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <p className="text-sm text-gray-700 mb-3">
        <strong>Atención prioritaria</strong> para usuarios de Abogados Online
      </p>
      
      <div className="text-sm text-gray-600 mb-4">
        <p className="mb-1">
          <strong>Dirección:</strong> Calle Azuay E2-231 entre Av. Amazonas y Av. República, Quito
        </p>
        <p className="mb-1">
          <strong>Teléfonos:</strong> 02 2247787 / 02 2440169 / 099 659 1682
        </p>
        <p>
          <strong>Email:</strong> jzapata@notaria18quito.com.ec
        </p>
      </div>
      
      <Link 
        href="https://maps.app.goo.gl/JKLmQZdY5ZvGnSZS6" 
        target="_blank"
        className="block w-full text-center bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition-colors"
      >
        Ver ubicación
      </Link>
    </div>
  );
}
