import React, { useState } from 'react';
import Button from '../ui/button';

const RegistryCalculator = () => {
  const [formData, setFormData] = useState({
    valorContrato: '',
    terceraEdad: false
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const RANGOS = [
    { min: 0.01, max: 3000.00, arancel: 22.00 },
    { min: 3000.01, max: 6600.00, arancel: 30.00 },
    { min: 6600.01, max: 10000.00, arancel: 35.00 },
    { min: 10000.01, max: 15000.00, arancel: 40.00 },
    { min: 15000.01, max: 25000.00, arancel: 50.00 },
    { min: 25000.01, max: 30000.00, arancel: 100.00 },
    { min: 30000.01, max: 35000.00, arancel: 160.00 },
    { min: 35000.01, max: 40000.00, arancel: 200.00 },
    { min: 40000.01, max: Infinity, baseArancel: 100.00, porcentajeExceso: 0.005 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const calcularArancel = (valorContrato) => {
    if (valorContrato <= 0) return { arancel: 0, rango: null };

    const rango = RANGOS.find(r => valorContrato >= r.min && valorContrato <= r.max);
    let arancel;
    
    if (valorContrato > 40000.01) {
      const exceso = valorContrato - 10000.00;
      arancel = 100.00 + (exceso * 0.005); // 0.5%
    } else {
      arancel = rango.arancel;
    }

    return {
      arancel: Math.min(arancel, 500.00),
      rango: RANGOS.indexOf(rango) + 1,
      excedeMaximo: arancel > 500.00
    };
  };

  const calcular = () => {
    const valor = parseFloat(formData.valorContrato);
    if (!valor || valor <= 0) {
      setError('El valor debe ser mayor a $0.01');
      return;
    }

    const { arancel, rango, excedeMaximo } = calcularArancel(valor);
    let arancelFinal = arancel;

    // Aplicar descuento tercera edad
    if (formData.terceraEdad) {
      arancelFinal = arancelFinal * 0.5; // 50% de descuento
    }

    setResultado({
      valorContrato: valor,
      rango,
      arancelBase: arancel,
      descuentoTerceraEdad: formData.terceraEdad ? arancel * 0.5 : 0,
      arancelFinal,
      excedeMaximo
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="relative">
        {/* Marca de agua */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="transform rotate-45 text-6xl font-bold text-gray-300">
            Registro de la Propiedad
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Calculadora de Aranceles de Inscripción
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulario */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor del Contrato/Acto
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="valorContrato"
                    value={formData.valorContrato}
                    onChange={handleChange}
                    className="input-field w-full pl-8"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="terceraEdad"
                    checked={formData.terceraEdad}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Aplica descuento tercera edad (65 años o más)
                  </span>
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Se requiere presentar documentos de respaldo para aplicar descuentos
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                onClick={calcular}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg mb-8"
              >
                Calcular Arancel
              </Button>
            </div>

            {/* Tabla de Rangos */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tabla de Rangos
              </h3>
              <div className="overflow-auto max-h-64">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Desde</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hasta</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Arancel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {RANGOS.map((rango, index) => (
                      <tr 
                        key={index}
                        className={`${
                          resultado && resultado.rango === index + 1
                            ? 'bg-blue-50'
                            : ''
                        }`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-700">
                          ${rango.min.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {rango.max === Infinity ? 'En adelante' : `$${rango.max.toFixed(2)}`}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {index === RANGOS.length - 1 
                            ? '$100.00 + 0.5% del exceso de $10,000'
                            : `$${rango.arancel.toFixed(2)}`
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {resultado && (
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Resultados del Cálculo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Valor del contrato:</span>
                  <span className="font-medium">${resultado.valorContrato.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Rango aplicado:</span>
                  <span className="font-medium">{resultado.rango}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Arancel base:</span>
                  <span className="font-medium">${resultado.arancelBase.toFixed(2)}</span>
                </div>

                {resultado.descuentoTerceraEdad > 0 && (
                  <div className="flex justify-between py-2 border-b text-blue-600">
                    <span>Descuento Tercera Edad (50%):</span>
                    <span className="font-medium">-${resultado.descuentoTerceraEdad.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg mt-4">
                  <span className="font-bold text-gray-900">Arancel final a pagar:</span>
                  <span className="font-bold text-blue-600 text-xl">
                    ${resultado.arancelFinal.toFixed(2)}
                  </span>
                </div>

                {resultado.excedeMaximo && (
                  <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                    Nota: Se ha aplicado el límite máximo de $500.00
                  </div>
                )}
              </div>

              {/* Notas y Advertencias */}
              <div className="mt-6 text-sm text-gray-500 space-y-2">
                <p>* Los valores son referenciales y están sujetos a verificación en el Registro de la Propiedad.</p>
                <p>* Para valores superiores a $40,000.01 se aplica una tarifa base más 0.5% sobre el exceso de $10,000.</p>
                <p>* El arancel máximo a pagar es de $500.00.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistryCalculator;
