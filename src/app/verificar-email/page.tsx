import React from 'react';
import { Metadata } from 'next';
import EmailVerification from '@/components/auth/EmailVerification';

export const metadata: Metadata = {
  title: 'Verificar Email | LegalDocs Hub',
  description: 'Verifica tu dirección de correo electrónico para activar tu cuenta en LegalDocs Hub.',
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <EmailVerification />
      </div>
    </div>
  );
}
