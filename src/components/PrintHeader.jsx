import React from 'react';

const PrintHeader = () => {
  return (
    <div className="hidden print:block print:mb-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <img 
          src="/brand/Logo/Logo - Imágenes/Logo horizontal/Logo horizontal.png"
          alt="Abogados Online Ecuador"
          className="h-16 object-contain"
        />
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900">Cotización de Servicios</h2>
          <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString('es-EC')}</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>WhatsApp: 0999266015</p>
        <p>Email: info@abogadosonlineecuador.com</p>
        <p>Web: www.abogadosonlineecuador.com</p>
      </div>
    </div>
  );
};

export default PrintHeader;
