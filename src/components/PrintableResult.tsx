import React from 'react';
import Watermark from '../components/ui/Watermark';
import { formatCurrency } from '../utils/municipalCalculations';

interface MunicipalResult {
  utilidad: {
    utilidadBruta: number;
    añosTranscurridos: number;
    deduccionTiempo: number;
    baseImponible: number;
    tarifa: string;
    impuesto: number;
  };
  alcabala: {
    baseImponible: number;
    rebaja: string;
    impuesto: number;
  };
  total: number;
}

interface NotarialResult {
  subtotal: string;
  iva: string;
  total: string;
}

interface RegistryResult {
  valorContrato: number;
  rango: string;
  arancelBase: number;
  descuentoTerceraEdad: number;
  arancelFinal: number;
}

interface FormData {
  [key: string]: string | number;
}

interface PrintableResultProps {
  resultado: MunicipalResult | NotarialResult | RegistryResult;
  tipo: 'municipal' | 'notarial' | 'registro';
  formData: FormData;
}

export default function PrintableResult({ resultado, tipo, formData }: PrintableResultProps) {
  return (
    <div className="print:block">
      {/* Estilos específicos para impresión */}
      <style type="text/css" media="print">
        {`
          @page {
            size: A4;
            margin: 1.5cm;
          }
          @media print {
            body {
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }
            .watermark {
              display: block !important;
              opacity: 0.12 !important;
            }
            .print-content {
              display: block !important;
              color: black !important;
            }
          }
        `}
      </style>

      {/* Contenedor principal con marca de agua */}
      <div className="relative bg-white p-8">
        {/* Marca de agua superior */}
        <div className="watermark absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <div className="transform rotate-45 text-6xl font-bold text-gray-800">
            www.abogadosonlineecuador.com
          </div>
        </div>

        <Watermark />

        {/* Contenido */}
        <div className="print-content relative z-10">
          {/* Encabezado */}
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

          {/* Datos del formulario */}
          {tipo === 'municipal' && formData && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Fecha de Adquisición:</p>
                <p className="font-medium">{formData.fechaAdquisicion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Transferencia:</p>
                <p className="font-medium">{formData.fechaTransferencia}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor de Transferencia:</p>
                <p className="font-medium">${formData.valorTransferencia}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor de Adquisición:</p>
                <p className="font-medium">${formData.valorAdquisicion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avalúo Catastral:</p>
                <p className="font-medium">${formData.avaluoCatastral}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo de Transferencia:</p>
                <p className="font-medium">{formData.tipoTransferencia}</p>
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resultados del Cálculo</h3>

            {tipo === 'municipal' && 'utilidad' in resultado && (
              <>
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

            {tipo === 'notarial' && 'subtotal' in resultado && (
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

            {tipo === 'registro' && 'valorContrato' in resultado && (
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
          </div>

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
}
