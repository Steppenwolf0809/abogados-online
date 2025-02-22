'use client';

import React from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Contáctanos
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Información de Contacto
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">WhatsApp</h3>
                <p className="text-gray-600">+593 97 931 7579</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Horario de Atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Envíanos un Mensaje
            </h2>
            <p className="text-gray-600 mb-4">
              Haz clic en el botón de WhatsApp para contactarnos directamente. Estamos aquí para ayudarte con tus trámites notariales.
            </p>
            <div className="mt-4">
              <a
                href={`https://wa.me/593979317579`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Atención Personalizada</h3>
            <p className="text-gray-600">
              Nuestro equipo de profesionales está dedicado a brindarte la mejor asesoría legal y notarial.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Servicio Eficiente</h3>
            <p className="text-gray-600">
              Optimizamos tu tiempo con procesos ágiles y herramientas digitales.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Transparencia</h3>
            <p className="text-gray-600">
              Conoce los costos exactos de tus trámites con nuestras calculadoras en línea.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Experiencia</h3>
            <p className="text-gray-600">
              Contamos con años de experiencia en trámites notariales y legales en Ecuador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
