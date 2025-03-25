'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from './withAuth';
import { DocumentType } from '@prisma/client';

// Componente para generar documentos con IA
function DocumentGeneratorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [documentType, setDocumentType] = useState<DocumentType>('POWER_OF_ATTORNEY');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    identification: '',
    address: '',
    description: '',
  });

  // Función para manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para generar el documento
  const handleGenerateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsGenerating(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: documentType,
          parameters: formData,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el documento');
      }
      
      // Redirigir a la página de documentos
      router.push('/documentos');
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al generar el documento');
    } finally {
      setIsGenerating(false);
    }
  };

  // Obtener el nombre del tipo de documento
  const getDocumentTypeName = (type: DocumentType): string => {
    const types: Record<string, string> = {
      POWER_OF_ATTORNEY: 'Poder',
      DECLARATION: 'Declaración',
      CONTRACT: 'Contrato',
      TRANSFER: 'Transferencia',
      PROMISE: 'Promesa',
      TRAVEL: 'Autorización de Viaje',
      CUSTOM: 'Personalizado',
    };
    return types[type] || 'Documento';
  };

  // Obtener la descripción del tipo de documento
  const getDocumentTypeDescription = (type: DocumentType): string => {
    const descriptions: Record<string, string> = {
      POWER_OF_ATTORNEY: 'Documento legal que autoriza a una persona a actuar en nombre de otra.',
      DECLARATION: 'Documento en el que una persona declara bajo juramento ciertos hechos.',
      CONTRACT: 'Acuerdo legal entre dos o más partes.',
      TRANSFER: 'Documento que formaliza la transferencia de bienes o derechos.',
      PROMISE: 'Documento que establece un compromiso de compraventa.',
      TRAVEL: 'Autorización para que un menor de edad pueda viajar.',
      CUSTOM: 'Documento personalizado según tus necesidades específicas.',
    };
    return descriptions[type] || 'Documento legal personalizado.';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Generador de Documentos con IA</h1>
          <p className="text-gray-600">
            Crea documentos legales personalizados en minutos con nuestra tecnología de IA
          </p>
        </div>
        <button
          onClick={() => router.push('/documentos')}
          className="mt-4 md:mt-0 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Ver mis documentos
        </button>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
          <h2 className="text-2xl font-bold mb-2">Crear Nuevo Documento</h2>
          <p className="opacity-90">Selecciona el tipo de documento y completa la información</p>
        </div>

        <form onSubmit={handleGenerateDocument} className="p-6">
          <div className="mb-6">
            <label htmlFor="documentType" className="block text-gray-700 font-medium mb-2">
              Tipo de Documento
            </label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as DocumentType)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="POWER_OF_ATTORNEY">Poder</option>
              <option value="DECLARATION">Declaración Juramentada</option>
              <option value="CONTRACT">Contrato</option>
              <option value="TRANSFER">Transferencia de Bienes</option>
              <option value="PROMISE">Promesa de Compraventa</option>
              <option value="TRAVEL">Autorización de Viaje</option>
              <option value="CUSTOM">Documento Personalizado</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {getDocumentTypeDescription(documentType)}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="identification" className="block text-gray-700 font-medium mb-2">
              Número de Identificación
            </label>
            <input
              type="text"
              id="identification"
              name="identification"
              value={formData.identification}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu número de cédula o pasaporte"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu dirección completa"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Descripción o Detalles Adicionales
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe los detalles específicos que necesitas incluir en el documento"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full py-3 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? 'Generando documento...' : `Generar ${getDocumentTypeName(documentType)}`}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Información sobre la generación de documentos</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Nuestro sistema utiliza inteligencia artificial para generar documentos legales personalizados
            según tus necesidades específicas.
          </p>
          <p>
            Los documentos generados son solo borradores y deben ser revisados por un profesional legal
            antes de su uso oficial.
          </p>
          <p>
            Esta funcionalidad está disponible exclusivamente para usuarios con suscripción Premium.
          </p>
        </div>
      </div>
    </div>
  );
}

// Exportar el componente con el HOC de autenticación y requerimiento premium
export default withAuth(DocumentGeneratorPage, true);
