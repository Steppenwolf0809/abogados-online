'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from './withAuth';

// Tipo para los documentos
interface Document {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

// Componente para mostrar los documentos del usuario
function DocumentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Documentos de ejemplo (en una aplicación real, estos vendrían de una API)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Poder General',
      type: 'POWER_OF_ATTORNEY',
      createdAt: '2025-03-15T10:30:00Z',
      updatedAt: '2025-03-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'Declaración Juramentada de Bienes',
      type: 'DECLARATION',
      createdAt: '2025-03-10T14:45:00Z',
      updatedAt: '2025-03-12T09:15:00Z',
    },
    {
      id: '3',
      title: 'Contrato de Arrendamiento',
      type: 'CONTRACT',
      createdAt: '2025-02-28T16:20:00Z',
      updatedAt: '2025-03-01T11:05:00Z',
    },
    {
      id: '4',
      title: 'Autorización de Viaje para Menor',
      type: 'TRAVEL',
      createdAt: '2025-02-20T09:10:00Z',
      updatedAt: '2025-02-20T09:10:00Z',
    },
    {
      id: '5',
      title: 'Promesa de Compraventa',
      type: 'PROMISE',
      createdAt: '2025-02-15T13:25:00Z',
      updatedAt: '2025-02-16T10:40:00Z',
    },
  ]);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Función para obtener el nombre del tipo de documento
  const getDocumentTypeName = (type: string) => {
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

  // Filtrar documentos según búsqueda y tipo
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  // Función para eliminar un documento
  const handleDeleteDocument = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };

  // Función para crear un nuevo documento
  const handleCreateDocument = () => {
    router.push('/documentos-ai');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Documentos</h1>
          <p className="text-gray-600">
            Gestiona tus documentos legales y accede a ellos en cualquier momento
          </p>
        </div>
        <button
          onClick={handleCreateDocument}
          className="mt-4 md:mt-0 px-6 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Crear Documento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-grow mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex-shrink-0">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="POWER_OF_ATTORNEY">Poderes</option>
                <option value="DECLARATION">Declaraciones</option>
                <option value="CONTRACT">Contratos</option>
                <option value="TRANSFER">Transferencias</option>
                <option value="PROMISE">Promesas</option>
                <option value="TRAVEL">Autorizaciones de Viaje</option>
                <option value="CUSTOM">Personalizados</option>
              </select>
            </div>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== 'all'
                ? 'Intenta con otros criterios de búsqueda'
                : 'Crea tu primer documento para comenzar'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Documento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Creado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actualizado
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-brand-100 rounded-lg flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-brand-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-100 text-brand-800">
                        {getDocumentTypeName(doc.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(doc.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Ver documento"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Descargar documento"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar documento"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Información sobre tus documentos</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Todos tus documentos están almacenados de forma segura en nuestra plataforma. Puedes
            acceder a ellos en cualquier momento y desde cualquier dispositivo.
          </p>
          <p>
            Los documentos generados a través de nuestra plataforma tienen validez legal y pueden
            ser utilizados para trámites oficiales.
          </p>
          <p>
            Si necesitas ayuda con algún documento o tienes alguna duda, no dudes en contactar a
            nuestro equipo de soporte.
          </p>
        </div>
      </div>
    </div>
  );
}

// Exportar el componente con el HOC de autenticación y requerimiento premium
export default withAuth(DocumentsPage, true);
