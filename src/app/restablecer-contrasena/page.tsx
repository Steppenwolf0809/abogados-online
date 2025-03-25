import React from 'react';
import { Metadata } from 'next';
import PasswordResetConfirmForm from '@/components/auth/PasswordResetConfirmForm';

export const metadata: Metadata = {
  title: 'Restablecer Contraseña | LegalDocs Hub',
  description: 'Restablece tu contraseña para acceder a tu cuenta en LegalDocs Hub.',
};

export default function PasswordResetConfirmPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <PasswordResetConfirmForm />
      </div>
    </div>
  );
}
