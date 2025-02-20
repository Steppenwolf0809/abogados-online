import React from 'react';

const testimonios = [
  {
    nombre: "María González",
    cargo: "Propietaria de Inmueble",
    texto: "El servicio fue excelente. La calculadora me ayudó a entender los costos antes de realizar mi trámite notarial.",
    imagen: "/testimonials/persona1.jpg"
  },
  {
    nombre: "Carlos Ramírez",
    cargo: "Empresario",
    texto: "Gracias a la asesoría profesional, pude realizar mi trámite de manera rápida y eficiente. Muy recomendado.",
    imagen: "/testimonials/persona2.jpg"
  },
  {
    nombre: "Ana Martínez",
    cargo: "Agente Inmobiliaria",
    texto: "Una herramienta indispensable para mi trabajo. Me permite dar información precisa a mis clientes sobre los costos notariales.",
    imagen: "/testimonials/persona3.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Testimonios de personas que han utilizado nuestros servicios
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0">
                    {/* Aquí iría la imagen del testimonio cuando las tengas */}
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonio.nombre}</h3>
                    <p className="text-sm text-gray-600">{testimonio.cargo}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonio.texto}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
