'use client';

import React from 'react';
import Link from 'next/link';

export default function CalculadorasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadoras de Trámites
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/calculadoras/municipal"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora Municipal
          </h2>
          <p className="text-gray-600">
            Calcula impuestos municipales como alcabalas y plusvalía para transferencias de dominio.
          </p>
        </Link>

        <Link
          href="/calculadoras/notarial"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora Notarial
          </h2>
          <p className="text-gray-600">
            Calcula tarifas notariales para diferentes tipos de trámites y servicios.
          </p>
        </Link>

        <Link
          href="/calculadoras/registro"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora de Registro
          </h2>
          <p className="text-gray-600">
            Calcula tasas de registro de la propiedad para inscripciones y certificados.
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          ¿Necesitas ayuda con tus cálculos?
        </h3>
        <p className="text-blue-700 mb-4">
          Nuestro equipo de profesionales está disponible para ayudarte a entender los costos de tus trámites y guiarte en el proceso.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
}
