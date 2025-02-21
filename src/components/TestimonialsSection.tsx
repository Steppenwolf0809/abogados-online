import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María Fernanda López",
    role: "Cliente",
    content: "El servicio fue excelente. Me ayudaron con mi trámite de poder notarial de manera rápida y profesional. La calculadora en línea me permitió conocer los costos exactos antes de iniciar el proceso.",
    image: "/testimonials/profile-1.jpg"
  },
  {
    id: 2,
    name: "Juan Carlos Mendoza",
    role: "Cliente",
    content: "Muy satisfecho con la atención recibida. El proceso fue transparente y la asesoría fue fundamental para completar mi trámite de declaración juramentada sin contratiempos.",
    image: "/testimonials/profile-2.jpg"
  },
  {
    id: 3,
    name: "Andrea Sánchez",
    role: "Cliente",
    content: "Excelente servicio y atención personalizada. Me guiaron en todo el proceso de transferencia de dominio y los costos fueron exactamente los calculados en la plataforma.",
    image: "/testimonials/profile-3.jpg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Testimonios de personas que han confiado en nuestros servicios
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm p-8 relative"
            >
              <div className="relative">
                <svg
                  className="absolute -top-6 -left-6 h-12 w-12 text-blue-600 transform -rotate-12"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg text-gray-600">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
