'use client';

import React from 'react';
import Header from '@/components/Header';
import UnderConstruction from '@/components/UnderConstruction';

export default function ContratosPage() {
  return (
    <>
      <div className="bg-white shadow-sm">
        <Header />
      </div>
      <UnderConstruction 
        title="Generación de Contratos - Próximamente"
        message="Estamos trabajando en la generación automática de contratos. Nuestra IA está siendo entrenada para ofrecerte el mejor servicio pronto."
      />
    </>
  );
}
