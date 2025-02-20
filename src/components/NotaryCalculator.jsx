import React, { useState, useEffect } from 'react';
import tarifas from '../data/tarifas.json';
import RequisitosServicio from './RequisitosServicio';
import PrintableResult from './PrintableResult';

const TIPOS_SERVICIO = {
  TRANSFERENCIA: 'transferenciaDominio',
  HIPOTECA: 'hipotecas',
  PROMESA: 'promesas',
  ARRIENDO: 'contratos_arriendo',
  PODER_NATURAL: 'poder_natural',
  PODER_JURIDICO: 'poder_juridico',
  DECLARACION: 'declaracion',
  DECLARACION_JURIDICA: 'declaracion_juridica',
  TESTAMENTO: 'testamento',
  DIVORCIO: 'divorcio',
  UNION_HECHO: 'union_hecho',
  AUTORIZACION_VIAJE: 'autorizacion_viaje',
  RECONOCIMIENTO_FIRMA: 'reconocimiento_firma',
  COPIA_CERTIFICADA: 'copia_certificada',
  MATERIALIZACION: 'materializacion',
  POSESION_EFECTIVA: 'posesion_efectiva',
  PROTOCOLIZACION: 'protocolizacion',
  COMPRAVENTA_VEHICULOS: 'compraventaVehiculos'
};

const SERVICIOS_INDETERMINADOS = {
  poder_natural: {
    nombre: "Poder (Persona Natural)",
    tarifa: tarifas.serviciosIndeterminados.poderes.personaNatural.tarifa,
    otorganteAdicional: tarifas.serviciosIndeterminados.poderes.personaNatural.otorganteAdicional
  },
  poder_juridico: {
    nombre: "Poder (Persona Jurídica)",
    tarifa: tarifas.serviciosIndeterminados.poderes.personaJuridica.tarifa
  },
  declaracion: {
    nombre: "Declaración Juramentada (Persona Natural)",
    tarifa: tarifas.serviciosIndeterminados.declaracionesJuramentadas.personaNatural.tarifa,
    otorganteAdicional: tarifas.serviciosIndeterminados.declaracionesJuramentadas.personaNatural.otorganteAdicional
  },
  declaracion_juridica: {
    nombre: "Declaración Juramentada (Persona Jurídica)",
    tarifa: tarifas.serviciosIndeterminados.declaracionesJuramentadas.personaJuridica.tarifa
  },
  testamento: {
    nombre: "Testamento Abierto",
    tarifa: tarifas.serviciosIndeterminados.testamentoAbierto.tarifa
  },
  divorcio: {
    nombre: "Divorcio por Mutuo Consentimiento",
    tarifa: tarifas.serviciosIndeterminados.disolucionSociedadConyugal.tarifa
  },
  union_hecho: {
    nombre: "Unión de Hecho",
    tarifa: tarifas.serviciosIndeterminados.unionHecho.tarifa
  },
  autorizacion_viaje: {
    nombre: "Autorización de Viaje",
    tarifa: tarifas.serviciosIndeterminados.autorizacionSalidaPais.tarifa
  },
  reconocimiento_firma: {
    nombre: "Reconocimiento de Firma",
    tarifa: tarifas.serviciosIndeterminados.reconocimientoFirma.tarifa
  },
  copia_certificada: {
    nombre: "Copia Certificada",
    tarifa: tarifas.serviciosIndeterminados.copiaCertificada.tarifa
  },
  materializacion: {
    nombre: "Materialización",
    tarifa: tarifas.serviciosIndeterminados.materializacion.tarifa
  },
  posesion_efectiva: {
    nombre: "Posesión Efectiva",
    tarifa: tarifas.serviciosIndeterminados.posesionEfectiva.tarifa
  },
  protocolizacion: {
    nombre: "Protocolización",
    tarifa: tarifas.serviciosIndeterminados.protocolizacion.tarifa
  },
  compraventaVehiculos: {
    nombre: "Compraventa de Vehículos",
    tarifa: tarifas.serviciosIndeterminados.compraventaVehiculos.tarifa,
    firmanteAdicional: tarifas.serviciosIndeterminados.compraventaVehiculos.firmanteAdicional
  }
};

const NotaryCalculator = () => {
  const [tipoServicio, setTipoServicio] = useState(TIPOS_SERVICIO.TRANSFERENCIA);
  const [monto, setMonto] = useState('');
  const [otorgantes, setOtorgantes] = useState(1);
  const [numeroFirmas, setNumeroFirmas] = useState(1);
  const [numeroMenores, setNumeroMenores] = useState(1);
  const [numeroHojas, setNumeroHojas] = useState(1);
  const [resultado, setResultado] = useState(null);

  const esServicioIndeterminado = () => {
    return SERVICIOS_INDETERMINADOS.hasOwnProperty(tipoServicio);
  };

  const calcularTarifaIndeterminada = () => {
    const servicio = SERVICIOS_INDETERMINADOS[tipoServicio];
    let subtotal = servicio.tarifa;

    if (tipoServicio === TIPOS_SERVICIO.RECONOCIMIENTO_FIRMA || 
        tipoServicio === TIPOS_SERVICIO.COMPRAVENTA_VEHICULOS) {
      subtotal = servicio.tarifa * numeroFirmas;
    } else if (tipoServicio === TIPOS_SERVICIO.AUTORIZACION_VIAJE) {
      subtotal = servicio.tarifa * numeroMenores;
    } else if (tipoServicio === TIPOS_SERVICIO.COPIA_CERTIFICADA || 
               tipoServicio === TIPOS_SERVICIO.MATERIALIZACION ||
               tipoServicio === TIPOS_SERVICIO.PROTOCOLIZACION) {
      subtotal = servicio.tarifa * numeroHojas;
    } else if (servicio.otorganteAdicional && otorgantes > 1) {
      subtotal += servicio.otorganteAdicional * (otorgantes - 1);
    }

    return subtotal;
  };

  const calcularTarifaDeterminada = (monto, tipo) => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) return 0;

    const tabla = tarifas.tablas[tipo];
    if (!tabla) return 0;

    // Si el tipo es contratos_arriendo, solo usamos los rangos
    if (tipo === TIPOS_SERVICIO.ARRIENDO) {
      const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
      return rango ? rango.tarifa : 0;
    }

    // Para otros tipos con excedente
    if (montoNum > tabla.excedente.limite) {
      const excedente = montoNum - tabla.excedente.limite;
      const baseSBU = parseInt(tabla.excedente.formula.base) * tarifas.remuneracionBasica;
      return baseSBU + (excedente * tabla.excedente.formula.porcentajeExcedente);
    }

    // Buscar en rangos
    const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
    return rango ? rango.tarifa : 0;
  };

  const calcularTotal = () => {
    let subtotal = 0;

    if (esServicioIndeterminado()) {
      if (!SERVICIOS_INDETERMINADOS[tipoServicio]) return;
      subtotal = calcularTarifaIndeterminada();
    } else {
      if (!monto) return;
      subtotal = calcularTarifaDeterminada(monto, tipoServicio);
    }

    const iva = subtotal * tarifas.iva;
    const total = subtotal + iva;

    setResultado({
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2)
    });
  };

  useEffect(() => {
    if (esServicioIndeterminado() || monto) {
      calcularTotal();
    }
  }, [monto, tipoServicio, otorgantes, numeroFirmas, numeroMenores, numeroHojas]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-8">
        {/* Tipo de Servicio */}
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
            Tipo de Servicio
          </label>
          <select
            className="select-field"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
          >
            <optgroup label="Servicios con Cuantía">
              <option value={TIPOS_SERVICIO.TRANSFERENCIA}>Transferencia de Dominio</option>
              <option value={TIPOS_SERVICIO.PROMESA}>Promesa de Compraventa</option>
              <option value={TIPOS_SERVICIO.HIPOTECA}>Hipoteca</option>
              <option value={TIPOS_SERVICIO.ARRIENDO}>Contrato de Arrendamiento</option>
            </optgroup>
            <optgroup label="Servicios sin Cuantía">
              <option value={TIPOS_SERVICIO.RECONOCIMIENTO_FIRMA}>Reconocimiento de Firma</option>
              <option value={TIPOS_SERVICIO.DECLARACION}>Declaración Juramentada (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.DECLARACION_JURIDICA}>Declaración Juramentada (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.COPIA_CERTIFICADA}>Copia Certificada</option>
              <option value={TIPOS_SERVICIO.PODER_NATURAL}>Poder (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.PODER_JURIDICO}>Poder (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.AUTORIZACION_VIAJE}>Autorización de Viaje</option>
              <option value={TIPOS_SERVICIO.MATERIALIZACION}>Materialización</option>
              <option value={TIPOS_SERVICIO.DIVORCIO}>Divorcio</option>
              <option value={TIPOS_SERVICIO.UNION_HECHO}>Unión de Hecho</option>
              <option value={TIPOS_SERVICIO.TESTAMENTO}>Testamento</option>
              <option value={TIPOS_SERVICIO.POSESION_EFECTIVA}>Posesión Efectiva</option>
              <option value={TIPOS_SERVICIO.PROTOCOLIZACION}>Protocolización</option>
              <option value={TIPOS_SERVICIO.COMPRAVENTA_VEHICULOS}>Compraventa de Vehículos</option>
            </optgroup>
          </select>
        </div>

        {/* Monto (solo para servicios con cuantía) */}
        {!esServicioIndeterminado() && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              {tipoServicio === TIPOS_SERVICIO.ARRIENDO ? 'Canon Mensual' : 'Monto'}
            </label>
            <div>
              <input
                type="number"
                className="input-field"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                min="0"
                step="0.01"
              placeholder={tipoServicio === TIPOS_SERVICIO.ARRIENDO ? 'Ingrese el canon mensual' : 'Ingrese el monto'}
              />
            </div>
            {tipoServicio === TIPOS_SERVICIO.TRANSFERENCIA && (
              <div className="mt-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <strong className="text-blue-800">Nota importante:</strong> Si el avalúo catastral es mayor al precio de venta, se debe considerar el avalúo catastral para el cálculo de las tasas notariales.
              </div>
            )}
          </div>
        )}

        {/* Campos adicionales según el tipo de servicio */}
        {(tipoServicio === TIPOS_SERVICIO.PODER_NATURAL ||
          tipoServicio === TIPOS_SERVICIO.DECLARACION) && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              Número de Otorgantes
            </label>
            <input
              type="number"
              className="input-field"
              value={otorgantes}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setOtorgantes('');
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue)) {
                    setOtorgantes(numValue);
                  }
                }
              }}
              min="1"
              placeholder="Número de otorgantes"
            />
          </div>
        )}

        {(tipoServicio === TIPOS_SERVICIO.RECONOCIMIENTO_FIRMA ||
          tipoServicio === TIPOS_SERVICIO.COMPRAVENTA_VEHICULOS) && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              {tipoServicio === TIPOS_SERVICIO.COMPRAVENTA_VEHICULOS ? 'Número de Firmantes' : 'Número de Firmas'}
            </label>
            <input
              type="number"
              className="input-field"
              value={numeroFirmas}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setNumeroFirmas('');
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue)) {
                    setNumeroFirmas(numValue);
                  }
                }
              }}
              min="1"
              placeholder="Número de firmas a reconocer"
            />
          </div>
        )}

        {(tipoServicio === TIPOS_SERVICIO.COPIA_CERTIFICADA ||
          tipoServicio === TIPOS_SERVICIO.MATERIALIZACION ||
          tipoServicio === TIPOS_SERVICIO.PROTOCOLIZACION) && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              Número de Hojas
            </label>
            <input
              type="number"
              className="input-field"
              value={numeroHojas}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setNumeroHojas('');
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue)) {
                    setNumeroHojas(numValue);
                  }
                }
              }}
              min="1"
              placeholder="Número de hojas"
            />
          </div>
        )}

        {tipoServicio === TIPOS_SERVICIO.AUTORIZACION_VIAJE && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              Número de Menores
            </label>
            <input
              type="number"
              className="input-field"
              value={numeroMenores}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setNumeroMenores('');
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue)) {
                    setNumeroMenores(numValue);
                  }
                }
              }}
              min="1"
              placeholder="Número de menores que viajan"
            />
          </div>
        )}

        {/* Resultados y Requisitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {resultado && (
            <div className="p-8 bg-gray-50 rounded-xl shadow-sm relative overflow-hidden results-section">
              <PrintableResult 
                resultado={resultado} 
                tipo="notarial" 
                formData={{
                  tipoServicio: SERVICIOS_INDETERMINADOS[tipoServicio]?.nombre || tipoServicio,
                  monto: monto,
                  otorgantes: otorgantes,
                  numeroFirmas: numeroFirmas,
                  numeroMenores: numeroMenores,
                  numeroHojas: numeroHojas
                }} 
              />
              {/* Marca de agua para capturas de pantalla */}
              <div className="absolute inset-0 grid gap-8 opacity-[0.06] pointer-events-none select-none -z-10"
                   style={{
                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                     transform: 'rotate(-45deg)',
                     transformOrigin: 'center',
                     marginTop: '-25%',
                     marginLeft: '-25%',
                     width: '150%',
                     height: '150%'
                   }}>
                {Array(20).fill('www.abogadosonlineecuador.com').map((text, i) => (
                  <div key={i} className="text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap text-center tracking-widest">
                    {text}
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Resultado</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium calculator-numbers text-xl">${resultado.subtotal}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">IVA (15%):</span>
                  <span className="font-medium calculator-numbers text-xl">${resultado.iva}</span>
                </div>
                <div className="flex justify-between items-center pt-3 text-lg">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-blue-600 calculator-numbers text-2xl">${resultado.total}</span>
                </div>
                {/* Botón de Imprimir */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors print-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
                    </svg>
                    Imprimir Resultados
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <p className="mb-2">* Los valores mostrados son referenciales y pueden variar según el caso específico.</p>
                  <p>* El costo final puede incluir certificaciones adicionales, copias certificadas u otros valores según los requerimientos del trámite.</p>
                </div>
              </div>
            </div>
          )}

            <div className="p-8 bg-gray-50 rounded-xl shadow-sm relative overflow-hidden">
              {/* Marca de agua para capturas de pantalla */}
              <div className="absolute inset-0 grid gap-2 opacity-[0.04] pointer-events-none select-none"
                   style={{
                     gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                     transform: 'rotate(-45deg)',
                     transformOrigin: 'center',
                     marginTop: '-50%',
                     marginLeft: '-50%',
                     width: '200%',
                     height: '200%'
                   }}>
                {Array(80).fill('abogadosonlineecuador.com').map((text, i) => (
                  <div key={i} className="text-xs font-bold text-gray-800 whitespace-nowrap text-center">
                    {text}
                  </div>
                ))}
              </div>
            <RequisitosServicio tramiteId={tipoServicio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaryCalculator;
