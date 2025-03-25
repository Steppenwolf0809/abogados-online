import React from 'react';
import { Metadata } from 'next';
import PasswordResetRequestForm from '@/components/auth/PasswordResetRequestForm';

export const metadata: Metadata = {
  title: 'Recuperar Contraseña | LegalDocs Hub',
  description: 'Solicita un enlace para restablecer tu contraseña en LegalDocs Hub.',
};

export default function PasswordResetRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <PasswordResetRequestForm />
      </div>
    </div>
  );
}
