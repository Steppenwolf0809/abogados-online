'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "El servicio fue excelente. Me ayudaron con todos los trámites notariales de manera rápida y eficiente. Recomiendo ampliamente sus servicios.",
    author: "María Fernanda",
    role: "Cliente",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    content: "Gracias a Abogados Online Ecuador pude realizar todos mis trámites sin complicaciones. El equipo es muy profesional y atento.",
    author: "Carlos Mendoza",
    role: "Cliente",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    content: "Excelente atención y asesoría legal. Me explicaron todo el proceso de manera clara y me ayudaron a resolver mi caso rápidamente.",
    author: "Ana Lucía Torres",
    role: "Cliente",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Testimonios de personas que han confiado en nuestros servicios
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-3xl mx-auto">
          <ScrollAnimation animation="zoom" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonials[activeTestimonial].imageUrl}
                      alt={testimonials[activeTestimonial].author}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonials[activeTestimonial].author}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-lg text-gray-700 italic">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 sm:-ml-6 flex items-center justify-center">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 sm:-mr-6 flex items-center justify-center">
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span className="sr-only">Next</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 w-2 rounded-full focus:outline-none ${
                  index === activeTestimonial ? 'bg-brand-600' : 'bg-gray-300'
                }`}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
