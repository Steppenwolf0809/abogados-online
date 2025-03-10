import React, { useState } from 'react';
import NotaryCalculator from '../../components/NotaryCalculator';
import MunicipalCalculator from '../../components/calculadoras/MunicipalCalculator.jsx';
import RegistryCalculator from '../../components/calculadoras/RegistryCalculator.jsx';
import Layout from '../../components/Layout';

const CalculadorasPage = () => {
  const [activeTab, setActiveTab] = useState('notarial');

  const tabs = [
    { id: 'notarial', name: 'Calculadora Notarial' },
    { id: 'municipal', name: 'Impuestos Municipales' },
    { id: 'registro', name: 'Registro de la Propiedad' },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Calculadoras
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Herramientas para calcular costos notariales, impuestos municipales y tasas de registro de la propiedad
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="border border-gray-200 rounded-lg bg-white p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calculadoras */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'notarial' && <NotaryCalculator />}
            {activeTab === 'municipal' && <MunicipalCalculator />}
            {activeTab === 'registro' && <RegistryCalculator />}
          </div>

          {/* SEO Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculadoras para Trámites Inmobiliarios en Ecuador</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600">
                  Nuestras calculadoras en línea te ayudan a estimar los costos asociados con trámites inmobiliarios en Ecuador. 
                  Desde tasas notariales hasta impuestos municipales, te proporcionamos herramientas precisas y actualizadas 
                  para planificar tus transacciones.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">¿Por qué usar nuestras calculadoras?</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Cálculos precisos basados en la legislación vigente</li>
                  <li>Interfaz fácil de usar y resultados instantáneos</li>
                  <li>Información detallada sobre cada costo y tarifa</li>
                  <li>Actualizaciones regulares según cambios en la normativa</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Tipos de Calculadoras Disponibles</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Calculadora Notarial</h4>
                    <p className="text-gray-600">
                      Calcula los costos notariales para diferentes trámites como escrituras, poderes, 
                      declaraciones juramentadas y más. Incluye el desglose de tarifas según el tipo de trámite.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Calculadora de Impuestos Municipales</h4>
                    <p className="text-gray-600">
                      Estima los impuestos municipales aplicables a transferencias de dominio, incluyendo 
                      alcabalas y plusvalía. Considera factores como tiempo de tenencia y mejoras realizadas.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Calculadora de Registro de la Propiedad</h4>
                    <p className="text-gray-600">
                      Calcula los aranceles de inscripción del Registro de la Propiedad para tus trámites. 
                      Incluye descuentos para tercera edad y muestra una tabla detallada de rangos y tarifas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalculadorasPage;
