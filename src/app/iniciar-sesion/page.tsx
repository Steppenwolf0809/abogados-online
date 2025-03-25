import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión | LegalDocs Hub',
  description: 'Inicia sesión en tu cuenta de LegalDocs Hub para acceder a todas las funcionalidades.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <LoginForm />
      </div>
    </div>
  );
}
