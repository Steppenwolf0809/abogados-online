'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CalculadoraNotarial from '@/components/calculadoras/NotarialCalculator';
import CalculadoraMunicipal from '@/components/calculadoras/MunicipalCalculator';
import CalculadoraRegistro from '@/components/calculadoras/RegistryCalculator';

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = useState('notarial');

  // Set active tab based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['notarial', 'municipal', 'registro'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Update URL hash when tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

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
            Calculadora de Valor de Escrituras
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas gratuitas para calcular el valor de escrituras, costos notariales para compraventa de inmuebles, promesas de compraventa, impuestos municipales y tasas de registro de la propiedad
          </p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap justify-center space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('notarial')}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm relative
                  ${activeTab === 'notarial'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Calculadora Notarial
                {activeTab !== 'notarial' && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-brand-100 text-brand-800 rounded-full">
                    Recomendado
                  </span>
                )}
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
          {activeTab === 'notarial' && (
            <>
              <div className="bg-brand-50 p-4 rounded-lg mb-6 border border-brand-100">
                <h2 className="text-lg font-semibold text-brand-800 mb-2">Calculadora de Valor de Escrituras</h2>
                <p className="text-brand-700">
                  Calcula el costo exacto de escrituras para compraventa de inmuebles, promesas de compraventa, poderes, declaraciones juramentadas y más trámites notariales en Ecuador.
                </p>
              </div>
              <CalculadoraNotarial />
            </>
          )}
          {activeTab === 'municipal' && <CalculadoraMunicipal />}
          {activeTab === 'registro' && <CalculadoraRegistro />}
        </div>
        
        {/* SEO Content */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-gray-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Valor de Escrituras en Ecuador</h2>
          <p className="mb-4">
            Nuestra calculadora de valor de escrituras te permite conocer con precisión cuánto costará realizar trámites notariales en Ecuador. Ya sea que necesites calcular el costo de una escritura de compraventa de inmuebles, promesa de compraventa, poderes, declaraciones juramentadas u otros documentos legales, nuestra herramienta te brinda información actualizada y precisa.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Compraventa de Inmuebles</h3>
          <p className="mb-4">
            La compraventa de inmuebles requiere escritura pública y genera costos notariales que varían según el valor de la transacción. Nuestra calculadora te ayuda a estimar estos costos con precisión, incluyendo los honorarios notariales y otros gastos asociados.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Promesas de Compraventa</h3>
          <p className="mb-4">
            Las promesas de compraventa son acuerdos preliminares que establecen las condiciones para una futura compraventa. Calcula el costo de formalizar este documento ante notario con nuestra herramienta especializada.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Poderes y Declaraciones Juramentadas</h3>
          <p>
            Los poderes y declaraciones juramentadas son documentos legales frecuentes que requieren autorización notarial. Utiliza nuestra calculadora para conocer el valor exacto de estos trámites y planificar tus gastos legales con anticipación.
          </p>
        </div>
      </div>
    </>
  );
}
