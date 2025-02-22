import React, { useState, useEffect } from 'react';
import tarifas from '../data/tarifas.json';
import { Tarifas, TipoServicio, esTipoServicioConCuantia } from '../types/tarifas';

interface ServicioIndeterminado {
  nombre: string;
  tarifa: number;
  otorganteAdicional?: number;
  firmanteAdicional?: number;
}

interface Resultado {
  subtotal: string;
  iva: string;
  total: string;
}

interface CalculadoraNotarialProps {
  onResultadoChange?: (resultado: Resultado | null) => void;
  className?: string;
  showResultados?: boolean;
}

const SERVICIOS_INDETERMINADOS: Record<string, ServicioIndeterminado> = {
  poderes_natural: {
    nombre: "Poder (Persona Natural)",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.poderes.personaNatural.tarifa,
    otorganteAdicional: (tarifas as Tarifas).serviciosIndeterminados.poderes.personaNatural.otorganteAdicional
  },
  poderes_juridica: {
    nombre: "Poder (Persona Jurídica)",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.poderes.personaJuridica.tarifa
  },
  declaraciones_natural: {
    nombre: "Declaración Juramentada (Persona Natural)",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.declaracionesJuramentadas.personaNatural.tarifa,
    otorganteAdicional: (tarifas as Tarifas).serviciosIndeterminados.declaracionesJuramentadas.personaNatural.otorganteAdicional
  },
  declaraciones_juridica: {
    nombre: "Declaración Juramentada (Persona Jurídica)",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.declaracionesJuramentadas.personaJuridica.tarifa
  },
  testamentoAbierto: {
    nombre: "Testamento Abierto",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.testamentoAbierto.tarifa
  },
  disolucionSociedadConyugal: {
    nombre: "Divorcio por Mutuo Consentimiento",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.disolucionSociedadConyugal.tarifa
  },
  unionHecho: {
    nombre: "Unión de Hecho",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.unionHecho.tarifa
  },
  autorizacionSalidaPais: {
    nombre: "Autorización de Viaje",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.autorizacionSalidaPais.tarifa
  },
  reconocimientoFirma: {
    nombre: "Reconocimiento de Firma",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.reconocimientoFirma.tarifa
  },
  copiaCertificada: {
    nombre: "Copia Certificada",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.copiaCertificada.tarifa
  },
  materializacion: {
    nombre: "Materialización",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.materializacion.tarifa
  },
  posesionEfectiva: {
    nombre: "Posesión Efectiva",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.posesionEfectiva.tarifa
  },
  protocolizacion: {
    nombre: "Protocolización",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.protocolizacion.tarifa
  },
  compraventaVehiculos: {
    nombre: "Compraventa de Vehículos",
    tarifa: (tarifas as Tarifas).serviciosIndeterminados.compraventaVehiculos.tarifa,
    firmanteAdicional: (tarifas as Tarifas).serviciosIndeterminados.compraventaVehiculos.firmanteAdicional
  }
};

export const CalculadoraNotarial: React.FC<CalculadoraNotarialProps> = ({
  onResultadoChange,
  className = '',
  showResultados = true
}) => {
  const [tipoServicio, setTipoServicio] = useState<TipoServicio>('transferenciaDominio');
  const [tipoPersona, setTipoPersona] = useState<'natural' | 'juridica'>('natural');
  const [monto, setMonto] = useState('');
  const [otorgantes, setOtorgantes] = useState('');
  const [numeroFirmas, setNumeroFirmas] = useState('');
  const [numeroMenores, setNumeroMenores] = useState('');
  const [numeroHojas, setNumeroHojas] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const handleNumericInput = (value: string, setter: (value: string) => void) => {
    // Eliminar cualquier caracter que no sea número
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Si el valor está vacío o es 0, establecer como vacío
    if (!numericValue || numericValue === '0') {
      setter('');
      return;
    }
    
    // Convertir a número y establecer el valor
    const numValue = parseInt(numericValue);
    setter(numValue.toString());
  };

  const calcularTarifaIndeterminada = (tipo: string): number => {
    let servicioKey = tipo;
    if (tipo === 'poderes' || tipo === 'declaracionesJuramentadas') {
      servicioKey = `${tipo}_${tipoPersona}`;
    }

    const servicio = SERVICIOS_INDETERMINADOS[servicioKey];
    if (!servicio) return 0;

    let subtotal = servicio.tarifa;

    if (tipo === 'reconocimientoFirma' || tipo === 'compraventaVehiculos') {
      subtotal = servicio.tarifa * (parseInt(numeroFirmas) || 1);
    } else if (tipo === 'autorizacionSalidaPais') {
      subtotal = servicio.tarifa * (parseInt(numeroMenores) || 1);
    } else if (tipo === 'copiaCertificada' || tipo === 'materializacion' || tipo === 'protocolizacion') {
      subtotal = servicio.tarifa * (parseInt(numeroHojas) || 1);
    } else if (tipoPersona === 'natural' && servicio.otorganteAdicional) {
      const numOtorgantes = parseInt(otorgantes) || 1;
      if (numOtorgantes > 1) {
        subtotal += servicio.otorganteAdicional * (numOtorgantes - 1);
      }
    }

    return subtotal;
  };

  const calcularTarifaDeterminada = (monto: string, tipo: TipoServicio): number => {
    if (!esTipoServicioConCuantia(tipo)) return 0;
    
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) return 0;

    const tabla = (tarifas as Tarifas).tablas[tipo];
    if (!tabla) return 0;

    if (tipo === 'contratos_arriendo') {
      const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
      return rango ? rango.tarifa : 0;
    }

    if (tabla.excedente && montoNum > tabla.excedente.limite) {
      const excedente = montoNum - tabla.excedente.limite;
      const baseSBU = parseInt(tabla.excedente.formula.base) * (tarifas as Tarifas).remuneracionBasica;
      return baseSBU + (excedente * tabla.excedente.formula.porcentajeExcedente);
    }

    const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
    return rango ? rango.tarifa : 0;
  };

  const calcularTotal = () => {
    let subtotal = 0;

    if (!esTipoServicioConCuantia(tipoServicio)) {
      subtotal = calcularTarifaIndeterminada(tipoServicio);
    } else {
      if (!monto) return;
      subtotal = calcularTarifaDeterminada(monto, tipoServicio);
    }

    const iva = subtotal * (tarifas as Tarifas).iva;
    const total = subtotal + iva;

    const nuevoResultado = {
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2)
    };

    setResultado(nuevoResultado);
    if (onResultadoChange) {
      onResultadoChange(nuevoResultado);
    }
  };

  useEffect(() => {
    if (!esTipoServicioConCuantia(tipoServicio) || monto) {
      calcularTotal();
    }
  }, [monto, tipoServicio, tipoPersona, otorgantes, numeroFirmas, numeroMenores, numeroHojas]);

  return (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Servicio
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={tipoServicio}
            onChange={(e) => {
              setTipoServicio(e.target.value as TipoServicio);
              if (!['poderes', 'declaracionesJuramentadas'].includes(e.target.value)) {
                setTipoPersona('natural');
              }
            }}
          >
            <optgroup label="Servicios con Cuantía">
              <option value="transferenciaDominio">Transferencia de Dominio</option>
              <option value="promesas">Promesa de Compraventa</option>
              <option value="hipotecas">Hipoteca</option>
              <option value="contratos_arriendo">Contrato de Arrendamiento</option>
            </optgroup>
            <optgroup label="Servicios sin Cuantía">
              <option value="reconocimientoFirma">Reconocimiento de Firma</option>
              <option value="declaracionesJuramentadas">Declaración Juramentada</option>
              <option value="copiaCertificada">Copia Certificada</option>
              <option value="poderes">Poder</option>
              <option value="autorizacionSalidaPais">Autorización de Viaje</option>
              <option value="materializacion">Materialización</option>
              <option value="disolucionSociedadConyugal">Divorcio</option>
              <option value="unionHecho">Unión de Hecho</option>
              <option value="testamentoAbierto">Testamento</option>
              <option value="posesionEfectiva">Posesión Efectiva</option>
              <option value="protocolizacion">Protocolización</option>
              <option value="compraventaVehiculos">Compraventa de Vehículos</option>
            </optgroup>
          </select>
        </div>

        {(tipoServicio === 'poderes' || tipoServicio === 'declaracionesJuramentadas') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Persona
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={tipoPersona}
              onChange={(e) => setTipoPersona(e.target.value as 'natural' | 'juridica')}
            >
              <option value="natural">Persona Natural</option>
              <option value="juridica">Persona Jurídica</option>
            </select>
          </div>
        )}

        {esTipoServicioConCuantia(tipoServicio) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {tipoServicio === 'contratos_arriendo' ? 'Canon Mensual' : 'Monto'}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*\.?[0-9]*"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder={tipoServicio === 'contratos_arriendo' ? 'Ingrese el canon mensual' : 'Ingrese el monto'}
              />
            </div>
          </div>
        )}

        {(tipoServicio === 'poderes' || tipoServicio === 'declaracionesJuramentadas') && tipoPersona === 'natural' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Otorgantes
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={otorgantes}
              onChange={(e) => handleNumericInput(e.target.value, setOtorgantes)}
              placeholder="Número de otorgantes"
            />
          </div>
        )}

        {(tipoServicio === 'reconocimientoFirma' || tipoServicio === 'compraventaVehiculos') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {tipoServicio === 'compraventaVehiculos' ? 'Número de Firmantes' : 'Número de Firmas'}
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={numeroFirmas}
              onChange={(e) => handleNumericInput(e.target.value, setNumeroFirmas)}
              placeholder="Número de firmas a reconocer"
            />
          </div>
        )}

        {(tipoServicio === 'copiaCertificada' || tipoServicio === 'materializacion' || tipoServicio === 'protocolizacion') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Hojas
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={numeroHojas}
              onChange={(e) => handleNumericInput(e.target.value, setNumeroHojas)}
              placeholder="Número de hojas"
            />
          </div>
        )}

        {tipoServicio === 'autorizacionSalidaPais' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Menores
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={numeroMenores}
              onChange={(e) => handleNumericInput(e.target.value, setNumeroMenores)}
              placeholder="Número de menores que viajan"
            />
          </div>
        )}
      </div>

      {showResultados && resultado && (
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium text-xl">${resultado.subtotal}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">IVA (12%):</span>
            <span className="font-medium text-xl">${resultado.iva}</span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-blue-600">${resultado.total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraNotarial;
