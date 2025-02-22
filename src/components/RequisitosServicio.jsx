import React from 'react';
import requisitos from '../data/requisitos.json';

const RequisitosServicio = ({ tramiteId, tipoPersona = 'natural' }) => {
  const getRequisitos = (tramiteId, tipoPersona) => {
    // Mapeo de IDs de la calculadora a IDs de requisitos
    const idMap = {
      'poderes': tipoPersona === 'juridica' ? 'poder_juridico' : 'poder_natural',
      'declaracionesJuramentadas': tipoPersona === 'juridica' ? 'declaracion_juridica' : 'declaracion',
      'transferenciaDominio': 'transferenciaDominio',
      'hipotecas': 'hipotecas',
      'promesas': 'promesas',
      'contratos_arriendo': 'contratos_arriendo',
      'autorizacionSalidaPais': 'autorizacion_viaje',
      'disolucionSociedadConyugal': 'divorcio',
      'unionHecho': 'union_hecho',
      'testamentoAbierto': 'testamento',
      'reconocimientoFirma': 'reconocimiento_firma',
      'posesionEfectiva': 'posesion_efectiva',
      'protocolizacion': 'protocolizacion',
      'compraventaVehiculos': 'compraventaVehiculos'
    };

    const requisitosId = idMap[tramiteId];
    return requisitos[requisitosId] || null;
  };

  const listaRequisitos = getRequisitos(tramiteId, tipoPersona);

  if (!listaRequisitos) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Requisitos
      </h3>
      
      <div className="space-y-4">
        <ul className="space-y-3">
          {listaRequisitos.map((requisito, index) => (
            <li key={index} className="flex items-start space-x-3 text-base text-gray-600 leading-relaxed">
              <span className="text-blue-500 mt-1.5">•</span>
              <span>{requisito}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequisitosServicio;
