'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function EmailVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { verifyEmail, error, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Si hay un token en la URL, verificar automáticamente
    if (token) {
      handleVerification();
    }
  }, [token]);

  const handleVerification = async () => {
    if (!token) {
      setErrorMessage('Token de verificación no proporcionado');
      return;
    }
    
    setIsVerifying(true);
    setErrorMessage('');
    clearError();
    
    try {
      await verifyEmail(token);
      setIsSuccess(true);
      
      // Redirigir después de 5 segundos
      setTimeout(() => {
        router.push('/iniciar-sesion');
      }, 5000);
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al verificar correo electrónico');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verificación de Correo Electrónico</h2>
      
      {!token && !isSuccess && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          No se ha proporcionado un token de verificación. Por favor, verifica tu correo electrónico y haz clic en el enlace de verificación.
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Tu correo electrónico ha sido verificado correctamente! Serás redirigido a la página de inicio de sesión en unos segundos.
        </div>
      )}
      
      {!isSuccess && token && (
        <button
          onClick={handleVerification}
          disabled={isVerifying}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isVerifying ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isVerifying ? 'Verificando...' : 'Verificar Correo Electrónico'}
        </button>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isSuccess ? (
            <Link href="/iniciar-sesion" className="text-blue-600 hover:underline">
              Ir a Iniciar Sesión
            </Link>
          ) : (
            <>
              ¿Ya has verificado tu correo?{' '}
              <Link href="/iniciar-sesion" className="text-blue-600 hover:underline">
                Inicia Sesión
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
