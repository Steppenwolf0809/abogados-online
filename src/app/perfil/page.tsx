import React from 'react';
import ProfilePage from '@/components/auth/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Perfil | LegalDocs Hub',
  description: 'Gestiona tu perfil y configuración de cuenta en LegalDocs Hub.',
};

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <ProfilePage />
      </div>
    </div>
  );
}
