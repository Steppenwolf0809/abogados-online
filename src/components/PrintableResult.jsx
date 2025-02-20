import React from 'react';

const PrintableResult = ({ resultado, tipo }) => {
  return (
    <div className="hidden print:block print:mt-8">
      <style type="text/css" media="print">
        {`
          @page {
            size: A4;
            margin: 2cm;
          }
          @media print {
            body {
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }
          }
        `}
      </style>
      <div className="relative">
        {/* Logo y Encabezado */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
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

        {/* Marca de agua */}
        <div className="absolute inset-0 grid gap-8 opacity-[0.08] pointer-events-none select-none"
             style={{
               gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
               transform: 'rotate(-45deg)',
               transformOrigin: 'center',
               marginTop: '-25%',
               marginLeft: '-25%',
               width: '150%',
               height: '150%'
             }}>
          {Array(20).fill('www.abogadosonlineecuador.com').map((text, i) => (
            <div key={i} className="text-xl font-bold text-black whitespace-nowrap text-center tracking-widest">
              {text}
            </div>
          ))}
        </div>

        {/* Contenido */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Resultados del Cálculo</h3>
          
          {tipo === 'municipal' && (
            <>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Impuesto a la Utilidad</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Utilidad Bruta:</span>
                    <span className="font-medium">${resultado.utilidad.utilidadBruta.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Años Transcurridos:</span>
                    <span className="font-medium">{resultado.utilidad.añosTranscurridos}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Deducción por Tiempo:</span>
                    <span className="font-medium">${resultado.utilidad.deduccionTiempo.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Base Imponible:</span>
                    <span className="font-medium">${resultado.utilidad.baseImponible.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Tarifa Aplicada:</span>
                    <span className="font-medium">{resultado.utilidad.tarifa}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b font-semibold">
                    <span className="text-gray-800">Impuesto a la Utilidad:</span>
                    <span className="text-blue-600">${resultado.utilidad.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Impuesto de Alcabala</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Base Imponible:</span>
                    <span className="font-medium">${resultado.alcabala.baseImponible.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Rebaja Aplicada:</span>
                    <span className="font-medium">{resultado.alcabala.rebaja}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b font-semibold">
                    <span className="text-gray-800">Impuesto de Alcabala:</span>
                    <span className="text-blue-600">${resultado.alcabala.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Impuesto a la Utilidad</span>
                      <p className="text-sm text-gray-600">(Paga el vendedor)</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${resultado.utilidad.impuesto.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Impuesto de Alcabala</span>
                      <p className="text-sm text-gray-600">(Paga el comprador)</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${resultado.alcabala.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {tipo === 'notarial' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-xl">${resultado.subtotal}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">IVA (15%):</span>
                <span className="font-medium text-xl">${resultado.iva}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-blue-600 text-2xl">${resultado.total}</span>
              </div>
            </div>
          )}

          {tipo === 'registro' && (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Valor del contrato:</span>
                <span className="font-medium">${resultado.valorContrato.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Rango aplicado:</span>
                <span className="font-medium">{resultado.rango}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Arancel base:</span>
                <span className="font-medium">${resultado.arancelBase.toFixed(2)}</span>
              </div>
              {resultado.descuentoTerceraEdad > 0 && (
                <div className="flex justify-between py-2 border-b text-blue-600">
                  <span>Descuento Tercera Edad (50%):</span>
                  <span className="font-medium">-${resultado.descuentoTerceraEdad.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg mt-4">
                <span className="font-bold text-gray-900">Arancel final a pagar:</span>
                <span className="font-bold text-blue-600 text-xl">
                  ${resultado.arancelFinal.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Información de contacto */}
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-gray-600">WhatsApp: 0999266015</p>
            <p className="text-sm text-gray-600">Email: info@abogadosonlineecuador.com</p>
            <p className="text-sm text-gray-600">Web: www.abogadosonlineecuador.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableResult;
