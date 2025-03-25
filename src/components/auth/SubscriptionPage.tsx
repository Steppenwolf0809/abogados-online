'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from './withAuth';

function SubscriptionPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Precios de los planes
  const prices = {
    monthly: {
      price: 19.99,
      save: 0,
    },
    annual: {
      price: 199.99,
      save: 39.89, // Ahorro de 2 meses
    },
  };

  // Características de la suscripción premium
  const features = [
    'Acceso a todas las calculadoras sin límites',
    'Generación de documentos legales con IA',
    'Almacenamiento de documentos en la nube',
    'Asistencia legal prioritaria',
    'Descuentos exclusivos en servicios notariales',
    'Actualizaciones automáticas de documentos',
  ];

  // Función para manejar el proceso de pago
  const handleSubscribe = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Aquí iría la lógica para procesar el pago
      // Por ahora, solo simulamos un proceso de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirigir a una página de éxito o mostrar un mensaje
      router.push('/perfil');
    } catch (error) {
      setErrorMessage('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Si el usuario ya es premium, mostrar un mensaje
  if (user?.userType === 'PREMIUM') {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">¡Ya tienes una suscripción Premium!</h1>
        <p className="text-lg mb-8">
          Estás disfrutando de todos los beneficios de nuestra suscripción premium.
        </p>
        <button
          onClick={() => router.push('/perfil')}
          className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
        >
          Ir a mi perfil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Suscripción Premium</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Desbloquea todas las funcionalidades y lleva tu experiencia al siguiente nivel
      </p>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
          <h2 className="text-2xl font-bold mb-2">Plan Premium</h2>
          <p className="opacity-90">Acceso completo a todas las funcionalidades</p>
        </div>

        <div className="p-6">
          {/* Selector de plan */}
          <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                selectedPlan === 'monthly'
                  ? 'bg-white shadow-md text-brand-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedPlan('monthly')}
            >
              Mensual
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                selectedPlan === 'annual'
                  ? 'bg-white shadow-md text-brand-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedPlan('annual')}
            >
              Anual
            </button>
          </div>

          {/* Precio */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold">${prices[selectedPlan].price}</span>
              <span className="text-gray-500 ml-2">
                {selectedPlan === 'monthly' ? '/mes' : '/año'}
              </span>
            </div>
            {selectedPlan === 'annual' && (
              <div className="mt-2 text-green-600 font-medium">
                Ahorras ${prices[selectedPlan].save} al año
              </div>
            )}
          </div>

          {/* Características */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Incluye:</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón de suscripción */}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className={`w-full py-3 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors ${
              isProcessing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? 'Procesando...' : 'Suscribirme ahora'}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Puedes cancelar tu suscripción en cualquier momento desde tu perfil.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Preguntas frecuentes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">¿Puedo cancelar mi suscripción en cualquier momento?</h4>
            <p className="text-gray-600 text-sm mt-1">
              Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil. No hay
              compromisos a largo plazo.
            </p>
          </div>
          <div>
            <h4 className="font-medium">¿Cómo funciona la facturación?</h4>
            <p className="text-gray-600 text-sm mt-1">
              La facturación se realiza de forma automática al inicio de cada período. Recibirás un
              correo electrónico con tu factura.
            </p>
          </div>
          <div>
            <h4 className="font-medium">¿Qué métodos de pago aceptan?</h4>
            <p className="text-gray-600 text-sm mt-1">
              Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), así como
              PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportar el componente con el HOC de autenticación
export default withAuth(SubscriptionPage);
