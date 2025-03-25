import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro | LegalDocs Hub',
  description: 'Crea una cuenta en LegalDocs Hub para acceder a todas las funcionalidades.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <RegisterForm />
      </div>
    </div>
  );
}
