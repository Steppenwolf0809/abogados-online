'use client';

import React from 'react';
import Header from '@/components/Header';
import UnderConstruction from '@/components/UnderConstruction';

export default function ViajePage() {
  return (
    <>
      <div className="bg-white shadow-sm">
        <Header />
      </div>
      <UnderConstruction 
        title="Generación de Autorizaciones de Viaje - Próximamente"
        message="Estamos trabajando en la generación automática de autorizaciones de viaje para menores de edad. Nuestra IA está siendo entrenada para ofrecerte el mejor servicio pronto."
      />
    </>
  );
}
