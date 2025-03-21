'use client';

import React, { useState } from 'react';

export default function NotariaAd() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="fixed right-4 bottom-24 z-40">
      {/* Banner colapsado */}
      {!isExpanded && (
        <div 
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 cursor-pointer flex items-center"
          onClick={() => setIsExpanded(true)}
        >
          <div className="bg-blue-600 text-white p-3 font-semibold">
            Notaría 18
          </div>
          <div className="p-2 text-sm">
            <span className="text-blue-600 font-medium">Asesoría gratuita</span>
          </div>
        </div>
      )}
      
      {/* Banner expandido */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-64">
          <div className="flex justify-between items-center bg-blue-600 text-white p-2">
            <h3 className="font-semibold">
              Notaría recomendada en Quito
            </h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-white hover:text-gray-200"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="p-3">
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
      )}
    </div>
  );
}
