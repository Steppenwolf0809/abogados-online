'use client';

import React from 'react';
import Image from 'next/image';

interface PrintableResultProps {
  resultado: {
    total: number;
    desglose?: {
      [key: string]: number;
    };
  };
  tipo: 'municipal' | 'notarial' | 'registro';
  formData: Record<string, string>;
}

export default function PrintableResult({ resultado, tipo, formData }: PrintableResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTipoLabel = () => {
    switch (tipo) {
      case 'municipal':
        return 'Calculadora Municipal';
      case 'notarial':
        return 'Calculadora Notarial';
      case 'registro':
        return 'Calculadora de Registro';
      default:
        return 'Calculadora';
    }
  };

  return (
    <div className="print:p-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8 print:mb-6">
        <div className="flex items-center">
          <div className="relative h-12 w-48">
            <Image
              src="/brand/Logo/Logo horizontal.svg"
              alt="Abogados Online Ecuador"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-900">{getTipoLabel()}</h2>
          <p className="text-sm text-gray-500">Fecha: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Datos del cálculo */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Datos del cálculo:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">{key}:</span>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resultados:</h3>
        {resultado.desglose && (
          <div className="space-y-2 mb-4">
            {Object.entries(resultado.desglose).map(([concepto, valor]) => (
              <div key={concepto} className="flex justify-between">
                <span className="text-gray-600">{concepto}:</span>
                <span className="text-gray-900 font-medium">
                  {new Intl.NumberFormat('es-EC', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(valor)}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-lg font-bold text-blue-600">
            {new Intl.NumberFormat('es-EC', {
              style: 'currency',
              currency: 'USD'
            }).format(resultado.total)}
          </span>
        </div>
      </div>

      {/* Pie de página */}
      <div className="text-sm text-gray-500 mt-12">
        <p>* Este cálculo es un estimado y puede variar según las circunstancias específicas del caso.</p>
        <p>* Para más información, contáctenos al 0999266015.</p>
      </div>
    </div>
  );
}
