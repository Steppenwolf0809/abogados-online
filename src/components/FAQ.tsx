'use client';

import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué servicios notariales ofrecen?",
    answer: "Ofrecemos una amplia gama de servicios notariales, incluyendo poderes, declaraciones juramentadas, contratos, promesas de compraventa, transferencias de dominio, y permisos de viaje para menores, entre otros."
  },
  {
    question: "¿Cómo puedo solicitar un servicio notarial?",
    answer: "Puede solicitar nuestros servicios a través de nuestro sitio web, completando el formulario de contacto, o llamándonos directamente. Un asesor se pondrá en contacto con usted para guiarle en el proceso."
  },
  {
    question: "¿Cuánto tiempo toma completar un trámite notarial?",
    answer: "El tiempo varía según el tipo de trámite. Algunos servicios pueden completarse el mismo día, mientras que otros pueden tomar entre 24 y 48 horas. Le proporcionaremos un estimado de tiempo al momento de solicitar el servicio."
  },
  {
    question: "¿Cuáles son los costos de los servicios notariales?",
    answer: "Los costos varían según el tipo de servicio. Puede consultar nuestra calculadora de tarifas en línea para obtener un estimado, o contactarnos directamente para recibir información detallada sobre los costos específicos de su trámite."
  },
  {
    question: "¿Qué documentos necesito para realizar un trámite notarial?",
    answer: "Los documentos requeridos dependen del tipo de trámite. En general, se necesita identificación válida y documentos específicos relacionados con el trámite. Le proporcionaremos una lista detallada de requisitos al momento de solicitar el servicio."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <ScrollAnimation 
              key={index} 
              animation="slideUp" 
              delay={index * 100}
              className="py-6"
            >
              <div>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`h-6 w-6 transform ${
                        openIndex === index ? 'rotate-180' : 'rotate-0'
                      } transition-transform duration-300 text-brand-500`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`mt-2 transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
