'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function DocumentosAIPage() {
  return (
    <>
      <Header />
      
      <div className="pt-24 min-h-screen bg-gradient-to-b from-brand-600/10 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-blue-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-4 bg-blue-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-brand-600 mb-6">
            Documentos con Inteligencia Artificial
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Me están entrenando con inteligencia artificial para darte el mejor servicio. Próximamente disponible.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="bg-blue-50 rounded-lg p-6 flex-1 max-w-md">
                <h3 className="text-xl font-semibold text-brand-600 mb-3">
                  ¿Qué estamos desarrollando?
                </h3>
                <p className="text-gray-600">
                  Un sistema inteligente que generará documentos legales personalizados según tus necesidades específicas, con la precisión y calidad de un abogado experto.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 flex-1 max-w-md">
                <h3 className="text-xl font-semibold text-brand-600 mb-3">
                  Beneficios
                </h3>
                <ul className="text-gray-600 text-left list-disc pl-5 space-y-2">
                  <li>Documentos personalizados en minutos</li>
                  <li>Precisión legal garantizada</li>
                  <li>Actualizados con la legislación vigente</li>
                  <li>Disponible 24/7</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/"
              className="px-8 py-3 bg-brand-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-700 hover:scale-105 transform"
            >
              Volver al inicio
            </Link>
          </div>
          
          <div className="mt-16 text-gray-500">
            <p>¿Tienes preguntas sobre este nuevo servicio?</p>
            <p className="mt-2">
              <Link href="/contacto" className="text-brand-600 hover:text-brand-700 underline">
                Contáctanos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
