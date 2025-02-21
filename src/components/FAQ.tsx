import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Qué documentos necesito para realizar un trámite notarial?',
    answer: 'Los documentos necesarios varían según el tipo de trámite. En general, se requiere cédula de identidad original y copia, certificado de votación vigente, y documentos específicos según el trámite. Para más detalles, puede consultar la sección de requisitos de cada servicio o contactarnos directamente.'
  },
  {
    question: '¿Cuánto tiempo toma realizar un trámite notarial?',
    answer: 'El tiempo de procesamiento depende del tipo de trámite y la complejidad del caso. La mayoría de los trámites simples pueden completarse en el mismo día. Para trámites más complejos, podemos proporcionarle un estimado de tiempo una vez que revisemos su caso específico.'
  },
  {
    question: '¿Existen descuentos o exenciones en los trámites notariales?',
    answer: 'Sí, existen descuentos y exenciones para ciertos grupos, como adultos mayores y personas con discapacidad. También aplicamos tarifas preferenciales en casos específicos. Le recomendamos consultar su caso particular con nuestro equipo.'
  },
  {
    question: '¿Puedo realizar trámites notariales en línea?',
    answer: 'Algunos trámites pueden iniciarse en línea, pero la mayoría requieren presencia física en la notaría para la firma de documentos. Sin embargo, ofrecemos asesoría inicial y preparación de documentos de forma remota para agilizar el proceso.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`w-6 h-6 transform ${
                        openIndex === index ? 'rotate-180' : ''
                      } text-gray-500`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
