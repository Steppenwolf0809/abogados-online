'use client';

import React, { useState } from 'react';
import PrintableResult from '@/components/PrintableResult';
import Watermark from '@/components/ui/Watermark';

interface Resultado {
  total: number;
  desglose: {
    [key: string]: number;
  };
}

export default function CalculadoraNotarial() {
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    tipoTramite: 'poder',
    cantidad: '1',
    valorContrato: ''
  });

  const calcularTarifaNotarial = (tipo: string, cantidad: number, valor: number) => {
    let tarifa = 0;
    let desglose: { [key: string]: number } = {};

    switch (tipo) {
      case 'poder':
        tarifa = 30 * cantidad;
        desglose = {
          'Tarifa Base': 30 * cantidad,
        };
        break;
      case 'declaracion':
        tarifa = 25 * cantidad;
        desglose = {
          'Tarifa Base': 25 * cantidad,
        };
        break;
      case 'compraventa':
        const tarifaBase = valor * 0.002; // 0.2% del valor
        const minimo = 50;
        tarifa = Math.max(tarifaBase, minimo);
        desglose = {
          'Tarifa Base (0.2%)': tarifaBase,
          'Ajuste a Mínimo': tarifaBase < minimo ? minimo - tarifaBase : 0,
        };
        break;
      default:
        tarifa = 20;
        desglose = {
          'Tarifa Base': 20,
        };
    }

    // Agregar impuestos
    const iva = tarifa * 0.12;
    desglose['IVA (12%)'] = Number(iva.toFixed(2));
    
    return {
      total: Number((tarifa + iva).toFixed(2)),
      desglose
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    data.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    setFormData(formValues);

    const tipo = formValues.tipoTramite;
    const cantidad = parseInt(formValues.cantidad) || 1;
    const valor = parseFloat(formValues.valorContrato) || 0;

    const result = calcularTarifaNotarial(tipo, cantidad, valor);
    setResultado(result);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadora de Tarifas Notariales
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Trámite
            </label>
            <select
              name="tipoTramite"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              defaultValue="poder"
            >
              <option value="poder">Poder</option>
              <option value="declaracion">Declaración Juramentada</option>
              <option value="compraventa">Compraventa</option>
              <option value="otros">Otros Trámites</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              min="1"
              defaultValue="1"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor del Contrato (si aplica)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="valorContrato"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                step="0.01"
              />
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
          <PrintableResult resultado={resultado} tipo="notarial" formData={formData} />
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
