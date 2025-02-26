'use client';

import React from 'react';
import ScrollAnimation from './ScrollAnimation';

interface Stat {
  id: number;
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: "+5,000",
    label: "Clientes Satisfechos",
    description: "Hemos ayudado a miles de clientes con sus trámites notariales"
  },
  {
    id: 2,
    value: "+10",
    label: "Años de Experiencia",
    description: "Más de una década brindando servicios legales de calidad"
  },
  {
    id: 3,
    value: "+20",
    label: "Profesionales",
    description: "Contamos con un equipo de abogados y notarios especializados"
  },
  {
    id: 4,
    value: "24/7",
    label: "Atención Online",
    description: "Disponibles para atender sus consultas en cualquier momento"
  }
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Nuestros Números
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Cifras que respaldan nuestra trayectoria y compromiso
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollAnimation 
              key={stat.id} 
              animation="slideUp" 
              delay={index * 100}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-yellow mb-4">{stat.label}</div>
                <p className="text-white/80">{stat.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
