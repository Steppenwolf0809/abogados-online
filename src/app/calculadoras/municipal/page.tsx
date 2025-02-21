'use client';

import { useState } from 'react';
import { calcularImpuestos } from '@/utils/municipalCalculations';
import PrintableResult from '@/components/PrintableResult';
import Watermark from '@/components/ui/Watermark';

interface FormData {
  fechaAdquisicion: string;
  fechaTransferencia: string;
  valorTransferencia: string;
  valorAdquisicion: string;
  avaluoCatastral: string;
  tipoTransferencia: string;
  tipoTransferente: string;
  mejoras: string;
  contribucionMejoras: string;
}

export default function MunicipalCalculator() {
  const [formData, setFormData] = useState<FormData>({
    fechaAdquisicion: '',
    fechaTransferencia: new Date().toISOString().split('T')[0],
    valorTransferencia: '',
    valorAdquisicion: '',
    avaluoCatastral: '',
    tipoTransferencia: 'Compraventa',
    tipoTransferente: 'Natural',
    mejoras: '0',
    contribucionMejoras: '0'
  });

  const [resultado, setResultado] = useState<ReturnType<typeof calcularImpuestos> | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validarFormulario = (): boolean => {
    if (!formData.fechaAdquisicion || !formData.fechaTransferencia) {
      setError('Las fechas son obligatorias');
      return false;
    }
    if (new Date(formData.fechaTransferencia) <= new Date(formData.fechaAdquisicion)) {
      setError('La fecha de transferencia debe ser posterior a la fecha de adquisición');
      return false;
    }
    if (!formData.valorTransferencia || !formData.valorAdquisicion || !formData.avaluoCatastral) {
      setError('Los valores de transferencia, adquisición y avalúo catastral son obligatorios');
      return false;
    }
    return true;
  };

  const calcular = () => {
    if (!validarFormulario()) return;

    const resultado = calcularImpuestos({
      ...formData,
      valorTransferencia: parseFloat(formData.valorTransferencia),
      valorAdquisicion: parseFloat(formData.valorAdquisicion),
      avaluoCatastral: parseFloat(formData.avaluoCatastral),
      mejoras: parseFloat(formData.mejoras),
      contribucionMejoras: parseFloat(formData.contribucionMejoras)
    });

    setResultado(resultado);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="relative">
        <Watermark text="Abogados Online Ecuador" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Calculadora de Impuestos de Transferencia - Quito
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Fechas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Adquisición
              </label>
              <input
                type="date"
                name="fechaAdquisicion"
                value={formData.fechaAdquisicion}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Transferencia
              </label>
              <input
                type="date"
                name="fechaTransferencia"
                value={formData.fechaTransferencia}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>

            {/* Valores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Transferencia
              </label>
              <div>
                <input
                  type="number"
                  name="valorTransferencia"
                  value={formData.valorTransferencia}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Adquisición
              </label>
              <div>
                <input
                  type="number"
                  name="valorAdquisicion"
                  value={formData.valorAdquisicion}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avalúo Catastral
              </label>
              <div>
                <input
                  type="number"
                  name="avaluoCatastral"
                  value={formData.avaluoCatastral}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Tipo de Transferencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Transferencia
              </label>
              <select
                name="tipoTransferencia"
                value={formData.tipoTransferencia}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="Compraventa">Compraventa</option>
                <option value="Donación">Donación</option>
                <option value="Dación en pago">Dación en pago</option>
              </select>
            </div>

            {/* Tipo de Transferente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Transferente
              </label>
              <select
                name="tipoTransferente"
                value={formData.tipoTransferente}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="Natural">Persona Natural</option>
                <option value="Inmobiliaria">Inmobiliaria</option>
              </select>
            </div>

            {/* Deducciones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Mejoras
              </label>
              <div>
                <input
                  type="number"
                  name="mejoras"
                  value={formData.mejoras}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribución por Mejoras
              </label>
              <div>
                <input
                  type="number"
                  name="contribucionMejoras"
                  value={formData.contribucionMejoras}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg mb-8"
          >
            Calcular Impuestos
          </button>

          {resultado && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden results-section">
              <PrintableResult resultado={resultado} tipo="municipal" formData={formData} />
              <Watermark />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Resultados del Cálculo
              </h3>
              
              {/* Sección Utilidad */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Impuesto a la Utilidad</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Utilidad Bruta:</span>
                    <span className="font-medium">${resultado.utilidad.utilidadBruta.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Años Transcurridos:</span>
                    <span className="font-medium">{resultado.utilidad.añosTranscurridos}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Deducción por Tiempo:</span>
                    <span className="font-medium">${resultado.utilidad.deduccionTiempo.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Base Imponible:</span>
                    <span className="font-medium">${resultado.utilidad.baseImponible.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Tarifa Aplicada:</span>
                    <span className="font-medium">{resultado.utilidad.tarifa}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b font-semibold">
                    <span className="text-gray-800">Impuesto a la Utilidad:</span>
                    <span className="text-blue-600">${resultado.utilidad.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Sección Alcabala */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Impuesto de Alcabala</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Base Imponible:</span>
                    <span className="font-medium">${resultado.alcabala.baseImponible.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">Rebaja Aplicada:</span>
                    <span className="font-medium">{resultado.alcabala.rebaja}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b font-semibold">
                    <span className="text-gray-800">Impuesto de Alcabala:</span>
                    <span className="text-blue-600">${resultado.alcabala.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Totales Separados */}
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Impuesto a la Utilidad</span>
                      <p className="text-sm text-gray-600">(Paga el vendedor)</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${resultado.utilidad.impuesto.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Impuesto de Alcabala</span>
                      <p className="text-sm text-gray-600">(Paga el comprador)</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${resultado.alcabala.impuesto.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Botón de Imprimir */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
                  </svg>
                  Imprimir Resultados
                </button>
              </div>

              {/* Notas y Advertencias */}
              <div className="mt-4 text-sm text-gray-500 space-y-2">
                <p>* Los valores son referenciales y están sujetos a verificación municipal.</p>
                <p>* El impuesto de alcabala se calcula sobre el mayor valor entre el contractual y el avalúo.</p>
                <p>* Algunas transferencias pueden estar exentas de alcabala según el Art. 527 del COOTAD.</p>
                <p>* El impuesto a la utilidad lo paga el vendedor y el alcabala lo paga el comprador.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
