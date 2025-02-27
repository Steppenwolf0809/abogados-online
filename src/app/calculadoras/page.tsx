'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CalculadoraNotarial from '@/components/calculadoras/NotarialCalculator';
import CalculadoraMunicipal from '@/components/calculadoras/MunicipalCalculator';
import CalculadoraRegistro from '@/components/calculadoras/RegistryCalculator';

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = useState('notarial');

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/Logo/Logo - Imágenes/Logo horizontal/Logo horizontal.png"
              alt="Abogados Online Ecuador"
              width={200}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-brand-600 transition-colors">
              Inicio
            </Link>
            <Link href="/#servicios" className="text-gray-600 hover:text-brand-600 transition-colors">
              Servicios
            </Link>
            <Link href="/calculadoras" className="text-brand-600 font-medium">
              Calculadoras
            </Link>
            <Link href="/contacto" className="text-gray-600 hover:text-brand-600 transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadoras de Costos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas gratuitas para calcular costos notariales, impuestos municipales y tasas de registro de la propiedad
          </p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap justify-center space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('notarial')}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === 'notarial'
                    ? 'border-brand-500 text-brand-600'
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
                    ? 'border-brand-500 text-brand-600'
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
                    ? 'border-brand-500 text-brand-600'
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
    </>
  );
}
