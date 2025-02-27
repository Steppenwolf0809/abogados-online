// Funciones de cálculo para impuestos municipales

export type TipoTransferencia = 'Compraventa' | 'Donación' | 'Dación en pago';
export type TipoTransferente = 'Natural' | 'Inmobiliaria';

export interface MunicipalFormData {
  fechaAdquisicion: string;
  fechaTransferencia: string;
  valorTransferencia: number;
  valorAdquisicion: number;
  avaluoCatastral: number;
  tipoTransferencia: TipoTransferencia;
  tipoTransferente: TipoTransferente;
  mejoras: number;
  contribucionMejoras: number;
}

export function calcularAños(fechaAdquisicion: string, fechaTransferencia: string): number {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);

  // Calcular la diferencia en años
  let años = transferencia.getFullYear() - adquisicion.getFullYear();

  // Ajustar si no ha completado el año
  if (transferencia.getMonth() < adquisicion.getMonth() ||
      (transferencia.getMonth() === adquisicion.getMonth() &&
       transferencia.getDate() < adquisicion.getDate())) {
    años--;
  }

  return Math.min(Math.max(0, años), 20); // Entre 0 y 20 años
}

export function calcularMeses(fechaAdquisicion: string, fechaTransferencia: string): number {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);
  const diferencia = (transferencia.getTime() - adquisicion.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  return Math.floor(diferencia);
}

export function calcularRebajaAlcabala(fechaAdquisicion: string, fechaTransferencia: string): number {
  const mesesTranscurridos = calcularMeses(fechaAdquisicion, fechaTransferencia);

  if (mesesTranscurridos <= 12) return 0.40; // 40% primer año
  if (mesesTranscurridos <= 24) return 0.30; // 30% segundo año
  if (mesesTranscurridos <= 36) return 0.20; // 20% tercer año
  return 0; // Sin rebaja
}

export interface ResultadoUtilidad {
  utilidadBruta: number;
  añosTranscurridos: number;
  deduccionTiempo: number;
  baseImponible: number;
  tarifa: string;
  impuesto: number;
}

export interface ResultadoAlcabala {
  baseImponible: number;
  rebaja: string;
  impuesto: number;
}

export interface ResultadoImpuestos {
  utilidad: ResultadoUtilidad;
  alcabala: ResultadoAlcabala;
  total: number;
}

export function calcularImpuestos(formData: MunicipalFormData): ResultadoImpuestos {
  // 1. Cálculo de Utilidad
  const valorBase = Math.max(formData.valorTransferencia, formData.avaluoCatastral);
  const utilidadBruta = valorBase - (
    formData.valorAdquisicion +
    formData.mejoras +
    formData.contribucionMejoras
  );

  const añosTranscurridos = calcularAños(formData.fechaAdquisicion, formData.fechaTransferencia);
  const deduccionTiempo = utilidadBruta * 0.05 * añosTranscurridos;
  const baseImponibleUtilidad = utilidadBruta - deduccionTiempo;

  // Determinar tarifa de utilidad
  let tarifaUtilidad: number;
  if (formData.tipoTransferencia === 'Donación') {
    tarifaUtilidad = 0.01; // 1%
  } else if (formData.tipoTransferente === 'Inmobiliaria') {
    tarifaUtilidad = 0.04; // 4%
  } else {
    tarifaUtilidad = 0.10; // 10% para persona natural
  }

  // Si la base imponible es negativa o cero, el impuesto es cero, pero mantenemos la tarifa correcta
  const impuestoUtilidad = baseImponibleUtilidad <= 0 ? 0 : Math.round(baseImponibleUtilidad * tarifaUtilidad * 100) / 100;

  // 2. Cálculo de Alcabala
  const baseImponibleAlcabala = Math.max(formData.valorTransferencia, formData.avaluoCatastral);
  const tarifaAlcabala = 0.01; // 1%
  const rebajaAlcabala = calcularRebajaAlcabala(formData.fechaAdquisicion, formData.fechaTransferencia);
  const impuestoAlcabala = Math.round(baseImponibleAlcabala * tarifaAlcabala * (1 - rebajaAlcabala) * 100) / 100;

  return {
    utilidad: {
      utilidadBruta: Math.round(utilidadBruta * 100) / 100,
      añosTranscurridos,
      deduccionTiempo: Math.round(deduccionTiempo * 100) / 100,
      baseImponible: Math.round(baseImponibleUtilidad * 100) / 100,
      tarifa: (tarifaUtilidad * 100).toFixed(1).replace('.0', '') + '%',
      impuesto: impuestoUtilidad
    },
    alcabala: {
      baseImponible: Math.round(baseImponibleAlcabala * 100) / 100,
      rebaja: (rebajaAlcabala * 100).toFixed(0) + '%',
      impuesto: impuestoAlcabala
    },
    total: Math.round((impuestoUtilidad + impuestoAlcabala) * 100) / 100
  };
}
