'use client';

import React from 'react';

export default function NotariaAdInline() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4">
      <div className="bg-blue-600 text-white p-2">
        <h3 className="font-semibold text-center">
          Notaría recomendada en Quito
        </h3>
      </div>
      
      <div className="p-3">
        <p className="text-sm text-gray-600 mb-3 font-medium text-center">
          Atención prioritaria para usuarios de Abogados Online
        </p>
        
        <div className="text-xs text-gray-600 space-y-1 mb-3">
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
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
          <p className="text-green-800 font-medium text-sm text-center">
            Presentando este cálculo, reciba asesoría gratuita
          </p>
        </div>
      </div>
      
      <div className="flex">
        <a 
          href="https://wa.me/593996591682?text=Hola,%20vi%20su%20anuncio%20en%20la%20calculadora%20de%20Abogados%20Online%20y%20quisiera%20información%20sobre%20trámites%20notariales."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 text-white text-center py-2 hover:bg-green-600 transition-colors text-sm"
        >
          WhatsApp
        </a>
        <a 
          href="https://www.facebook.com/notaria18quito/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white text-center py-2 hover:bg-blue-700 transition-colors text-sm"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}
