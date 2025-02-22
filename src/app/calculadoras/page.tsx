'use client';

import React, { useState } from 'react';
import CalculadoraNotarial from '@/components/calculadoras/NotarialCalculator';
import CalculadoraMunicipal from '@/components/calculadoras/MunicipalCalculator';
import CalculadoraRegistro from '@/components/calculadoras/RegistryCalculator';

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = useState('notarial');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Calculadoras de Costos
      </h1>
      <p className="text-gray-600 mb-8">
        Herramientas para calcular costos notariales, impuestos municipales y tasas de registro de la propiedad
      </p>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('notarial')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'notarial'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Calculadora Notarial
            </button>
            <button
              onClick={() => setActiveTab('municipal')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'municipal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Impuestos Municipales
            </button>
            <button
              onClick={() => setActiveTab('registro')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'registro'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Registro de la Propiedad
            </button>
          </nav>
        </div>
      </div>

      <div>
        {activeTab === 'notarial' && <CalculadoraNotarial />}
        {activeTab === 'municipal' && <CalculadoraMunicipal />}
        {activeTab === 'registro' && <CalculadoraRegistro />}
      </div>
    </div>
  );
}
