'use client';

import React from 'react';
import Header from '@/components/Header';
import UnderConstruction from '@/components/UnderConstruction';

export default function PromesaPage() {
  return (
    <>
      <div className="bg-white shadow-sm">
        <Header />
      </div>
      <UnderConstruction 
        title="Generación de Promesas de Compraventa - Próximamente"
        message="Estamos trabajando en la generación automática de promesas de compraventa. Nuestra IA está siendo entrenada para ofrecerte el mejor servicio pronto."
      />
    </>
  );
}
