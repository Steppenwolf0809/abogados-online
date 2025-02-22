import React from 'react';
import { MunicipalFormData } from '@/utils/municipalCalculations';

interface ResultadoGenerico {
  total: number;
  desglose: Record<string, number>;
}

interface PrintableResultProps {
  resultado: ResultadoGenerico;
  tipo: 'municipal' | 'notarial' | 'registro';
  formData: MunicipalFormData | Record<string, string>;
}

const PrintableResult: React.FC<PrintableResultProps> = ({ resultado, tipo, formData }) => {
  const formatCurrency = (value: number | string | undefined) => {
    if (value === undefined || value === null) return '$0.00';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '$0.00';
    
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(numValue);
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return '';
    }
  };

  const renderMunicipalDetails = () => {
    const data = formData as MunicipalFormData;
    return (
      <>
        <div className="mb-4">
          <p><strong>Fecha de Adquisición:</strong> {formatDate(data.fechaAdquisicion)}</p>
          <p><strong>Fecha de Transferencia:</strong> {formatDate(data.fechaTransferencia)}</p>
          <p><strong>Valor de Transferencia:</strong> {formatCurrency(data.valorTransferencia)}</p>
          <p><strong>Valor de Adquisición:</strong> {formatCurrency(data.valorAdquisicion)}</p>
          <p><strong>Avalúo Catastral:</strong> {formatCurrency(data.avaluoCatastral)}</p>
          <p><strong>Tipo de Transferencia:</strong> {data.tipoTransferencia}</p>
          <p><strong>Tipo de Transferente:</strong> {data.tipoTransferente}</p>
        </div>
      </>
    );
  };

  return (
    <div className="print-only hidden print:block">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Abogados Online Ecuador</h1>
        <p className="text-lg">Calculadora de Impuestos</p>
        <p className="text-sm text-gray-600">www.abogadosonlineecuador.com</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Detalles del Cálculo</h2>
        {tipo === 'municipal' && renderMunicipalDetails()}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Resultados</h2>
        {Object.entries(resultado.desglose).map(([concepto, valor]) => (
          <div key={concepto} className="flex justify-between py-2 border-b">
            <span>{concepto}:</span>
            <span className="font-medium">{formatCurrency(valor)}</span>
          </div>
        ))}
        <div className="flex justify-between py-4 mt-4 border-t-2 border-gray-800">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">{formatCurrency(resultado.total)}</span>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>* Los valores son referenciales y están sujetos a verificación.</p>
        <p>* Documento generado el {new Date().toLocaleDateString('es-EC')}</p>
      </div>
    </div>
  );
};

export default PrintableResult;
