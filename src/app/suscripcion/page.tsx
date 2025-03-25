import React from 'react';
import { Metadata } from 'next';
import SubscriptionPage from '@/components/auth/SubscriptionPage';

export const metadata: Metadata = {
  title: 'Suscripción Premium | LegalDocs Hub',
  description: 'Actualiza a una cuenta premium para acceder a todas las funcionalidades de LegalDocs Hub.',
};

export default function SubscriptionPageWrapper() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SubscriptionPage />
      </div>
    </div>
  );
}
