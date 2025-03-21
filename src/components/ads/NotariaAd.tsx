'use client';

import React from 'react';
import Image from 'next/image';

export default function NotariaAd() {
  return (
    <div className="fixed right-4 top-1/3 transform -translate-y-1/2 z-40 w-64 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Notaría recomendada en Quito
        </h3>
        <div className="w-full h-32 mb-3 overflow-hidden rounded">
          <img
            src="https://i.imgur.com/Yx8Fwjl.jpg"
            alt="Notaría 18 - Dra. Glenda Zapata Silva"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Atención prioritaria</strong> para usuarios de Abogados Online
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <strong>Dirección:</strong> Calle Azuay E2-231 entre Av. Amazonas y Av. República, Quito
          </p>
          <p>
            <strong>Teléfonos:</strong> 02 2247787 / 02 2440169 / 099 659 1682
          </p>
          <p>
            <strong>Email:</strong> jzapata@notaria18quito.com.ec
          </p>
        </div>
      </div>
      <a 
        href="https://www.facebook.com/notaria18quito/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 text-white text-center py-2 hover:bg-blue-700 transition-colors"
      >
        Visitar Facebook
      </a>
    </div>
  );
}
