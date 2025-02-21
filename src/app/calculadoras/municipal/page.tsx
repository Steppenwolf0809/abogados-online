'use client';

import React, { useState } from 'react';
import PrintableResult from '@/components/PrintableResult';
import Watermark from '@/components/ui/Watermark';
import { calcularImpuestos } from '@/utils/municipalCalculations';

interface Resultado {
  total: number;
  desglose: {
    [key: string]: number;
  };
}

export default function CalculadoraMunicipal() {
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    avaluo: '',
    anioCompra: '',
    anioVenta: '',
    tipoPropiedad: 'urbano'
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    data.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    setFormData(formValues);

    const avaluo = parseFloat(formValues.avaluo);
    const anioCompra = parseInt(formValues.anioCompra);
    const anioVenta = parseInt(formValues.anioVenta);
    const tipoPropiedad = formValues.tipoPropiedad;

    if (!isNaN(avaluo) && !isNaN(anioCompra) && !isNaN(anioVenta)) {
      const result = calcularImpuestos(avaluo, anioCompra, anioVenta, tipoPropiedad);
      setResultado(result);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadora de Impuestos Municipales
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="avaluo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Avalúo del inmueble
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="avaluo"
                id="avaluo"
                required
                min="0"
                step="0.01"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="anioCompra"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Año de compra
              </label>
              <input
                type="number"
                name="anioCompra"
                id="anioCompra"
                required
                min="1900"
                max={new Date().getFullYear()}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="anioVenta"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Año de venta
              </label>
              <input
                type="number"
                name="anioVenta"
                id="anioVenta"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de propiedad
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tipoPropiedad"
                  value="urbano"
                  defaultChecked
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2">Urbano</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tipoPropiedad"
                  value="rural"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2">Rural</span>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calcular
            </button>
          </div>
        </form>
      </div>

      {resultado && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden results-section">
          <PrintableResult resultado={resultado} tipo="municipal" formData={formData} />
          <Watermark />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Resultados del Cálculo
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(resultado.desglose).map(([concepto, valor]) => (
                <div
                  key={concepto}
                  className="flex justify-between p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-gray-600">{concepto}:</span>
                  <span className="font-medium text-gray-900">
                    {new Intl.NumberFormat('es-EC', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(valor)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-lg font-semibold text-blue-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('es-EC', {
                  style: 'currency',
                  currency: 'USD',
                }).format(resultado.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
