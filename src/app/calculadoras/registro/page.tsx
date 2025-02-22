'use client';

import React, { useState } from 'react';
import { calcularArancelFinal, RANGOS, ResultadoRegistro } from '@/utils/registryCalculations';
import PrintableResult from '@/components/PrintableResult';
import Watermark from '@/components/ui/Watermark';

interface FormData {
  valorContrato: string;
  terceraEdad: boolean;
}

export default function CalculadoraRegistro() {
  const [formData, setFormData] = useState<FormData>({
    valorContrato: '',
    terceraEdad: false
  });

  const [resultado, setResultado] = useState<ResultadoRegistro | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const calcular = () => {
    const valor = parseFloat(formData.valorContrato);
    if (!valor || valor <= 0) {
      setError('El valor debe ser mayor a $0.01');
      return;
    }

    const resultado = calcularArancelFinal(valor, formData.terceraEdad);
    setResultado(resultado);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadora de Aranceles de Inscripción
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor del Contrato/Acto
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="valorContrato"
                  value={formData.valorContrato}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="terceraEdad"
                  checked={formData.terceraEdad}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Aplica descuento tercera edad (65 años o más)
                </span>
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Se requiere presentar documentos de respaldo para aplicar descuentos
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={calcular}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calcular Arancel
            </button>
          </div>

          {/* Tabla de Rangos */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tabla de Rangos
            </h3>
            <div className="overflow-auto max-h-64">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Desde</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hasta</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Arancel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {RANGOS.map((rango, index) => (
                    <tr 
                      key={index}
                      className={`${
                        resultado && resultado.rango === index + 1
                          ? 'bg-blue-50'
                          : ''
                      }`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">
                        ${rango.min.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {rango.max === Infinity ? 'En adelante' : `$${rango.max.toFixed(2)}`}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {index === RANGOS.length - 1 
                          ? '$100.00 + 0.5% del exceso de $10,000'
                          : `$${rango.arancel.toFixed(2)}`
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden results-section">
          <PrintableResult 
            resultado={{
              total: resultado.arancelFinal,
              desglose: resultado.desglose
            }}
            tipo="registro"
            formData={{
              valorContrato: formData.valorContrato,
              terceraEdad: formData.terceraEdad.toString()
            }}
          />
          <Watermark />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Resultados del Cálculo
          </h3>
          
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

            {resultado.excedeMaximo && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                Nota: Se ha aplicado el límite máximo de $500.00
              </div>
            )}
          </div>

          {/* Botón de Imprimir */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors print:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
              </svg>
              Imprimir Resultados
            </button>
          </div>

          {/* Notas y Advertencias */}
          <div className="mt-4 text-sm text-gray-500 space-y-2">
            <p>* Los valores son referenciales y están sujetos a verificación en el Registro de la Propiedad.</p>
            <p>* Para valores superiores a $40,000.01 se aplica una tarifa base más 0.5% sobre el exceso de $10,000.</p>
            <p>* El arancel máximo a pagar es de $500.00.</p>
          </div>
        </div>
      )}
    </div>
  );
}
