export default function CalculadorasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadoras de Costos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/calculadoras/municipal"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora Municipal
          </h2>
          <p className="text-gray-600">
            Calcule impuestos de alcabala y utilidad para transferencias de dominio.
          </p>
        </a>
        <a
          href="/calculadoras/notarial"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora Notarial
          </h2>
          <p className="text-gray-600">
            Calcule costos notariales para diferentes tipos de trámites.
          </p>
        </a>
        <a
          href="/calculadoras/registro"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Calculadora de Registro
          </h2>
          <p className="text-gray-600">
            Calcule costos de inscripción en el Registro de la Propiedad.
          </p>
        </a>
      </div>
    </div>
  );
}
