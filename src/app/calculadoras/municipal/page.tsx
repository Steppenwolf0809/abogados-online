'use client';

import React, { useState } from 'react';
import { calcularImpuestos, MunicipalFormData, ResultadoMunicipal } from '@/utils/municipalCalculations';
import PrintableResult from '@/components/PrintableResult';
import Watermark from '@/components/ui/Watermark';

const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

export default function CalculadoraMunicipal() {
  const [formData, setFormData] = useState<MunicipalFormData>({
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

  const [resultado, setResultado] = useState<ResultadoMunicipal | null>(null);
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
    const result = calcularImpuestos(formData);
    setResultado(result);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Calculadora de Impuestos de Transferencia - Quito
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Valores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Transferencia
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="valorTransferencia"
                  value={formData.valorTransferencia}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="valorAdquisicion"
                  value={formData.valorAdquisicion}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="avaluoCatastral"
                  value={formData.avaluoCatastral}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="mejoras"
                  value={formData.mejoras}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="contribucionMejoras"
                  value={formData.contribucionMejoras}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={calcular}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calcular Impuestos
          </button>
        </form>
      </div>

      {resultado && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden results-section">
          <PrintableResult 
            resultado={{
              total: resultado.total,
              desglose: {
                'Impuesto a la Utilidad': resultado.utilidad.impuesto,
                'Impuesto de Alcabala': resultado.alcabala.impuesto
              }
            }}
            tipo="municipal"
            formData={formData}
          />
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
                <span className="font-medium">${formatNumber(resultado.utilidad.utilidadBruta)}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Años Transcurridos:</span>
                <span className="font-medium">{resultado.utilidad.añosTranscurridos}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Deducción por Tiempo:</span>
                <span className="font-medium">${formatNumber(resultado.utilidad.deduccionTiempo)}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Base Imponible:</span>
                <span className="font-medium">${formatNumber(resultado.utilidad.baseImponible)}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Tarifa Aplicada:</span>
                <span className="font-medium">{resultado.utilidad.tarifa}</span>
              </div>
              <div className="flex justify-between py-1 border-b font-semibold">
                <span className="text-gray-800">Impuesto a la Utilidad:</span>
                <span className="text-blue-600">${formatNumber(resultado.utilidad.impuesto)}</span>
              </div>
            </div>
          </div>

          {/* Sección Alcabala */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Impuesto de Alcabala</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Base Imponible:</span>
                <span className="font-medium">${formatNumber(resultado.alcabala.baseImponible)}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-600">Rebaja Aplicada:</span>
                <span className="font-medium">{resultado.alcabala.rebaja}</span>
              </div>
              <div className="flex justify-between py-1 border-b font-semibold">
                <span className="text-gray-800">Impuesto de Alcabala:</span>
                <span className="text-blue-600">${formatNumber(resultado.alcabala.impuesto)}</span>
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
                <span className="text-2xl font-bold text-blue-600">${formatNumber(resultado.utilidad.impuesto)}</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">Impuesto de Alcabala</span>
                  <p className="text-sm text-gray-600">(Paga el comprador)</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">${formatNumber(resultado.alcabala.impuesto)}</span>
              </div>
            </div>
          </div>

          {/* Botón de Imprimir */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors print:hidden"
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
  );
}
