export interface MunicipalFormData {
  fechaAdquisicion: string;
  fechaTransferencia: string;
  valorTransferencia: string | number;
  valorAdquisicion: string | number;
  avaluoCatastral: string | number;
  tipoTransferencia: 'Compraventa' | 'Donación' | 'Dación en pago';
  tipoTransferente: 'Natural' | 'Inmobiliaria';
  mejoras: string | number;
  contribucionMejoras: string | number;
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

export interface ResultadoMunicipal {
  utilidad: ResultadoUtilidad;
  alcabala: ResultadoAlcabala;
  total: number;
}

export function calcularAños(fechaAdquisicion: string, fechaTransferencia: string): number {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);
  
  let años = transferencia.getFullYear() - adquisicion.getFullYear();
  
  if (transferencia.getMonth() < adquisicion.getMonth() || 
      (transferencia.getMonth() === adquisicion.getMonth() && 
       transferencia.getDate() < adquisicion.getDate())) {
    años--;
  }
  
  return Math.min(Math.max(0, años), 20);
}

export function calcularMeses(fechaAdquisicion: string, fechaTransferencia: string): number {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);
  const diferencia = (transferencia.getTime() - adquisicion.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  return Math.floor(diferencia);
}

export function calcularRebajaAlcabala(fechaAdquisicion: string, fechaTransferencia: string): number {
  const mesesTranscurridos = calcularMeses(fechaAdquisicion, fechaTransferencia);
  
  if (mesesTranscurridos <= 12) return 0.40;
  if (mesesTranscurridos <= 24) return 0.30;
  if (mesesTranscurridos <= 36) return 0.20;
  return 0;
}

export function calcularImpuestos(data: MunicipalFormData): ResultadoMunicipal {
  const valorTransferencia = typeof data.valorTransferencia === 'string' ? 
    parseFloat(data.valorTransferencia) : data.valorTransferencia;
  const valorAdquisicion = typeof data.valorAdquisicion === 'string' ? 
    parseFloat(data.valorAdquisicion) : data.valorAdquisicion;
  const avaluoCatastral = typeof data.avaluoCatastral === 'string' ? 
    parseFloat(data.avaluoCatastral) : data.avaluoCatastral;
  const mejoras = typeof data.mejoras === 'string' ? 
    parseFloat(data.mejoras) : data.mejoras;
  const contribucionMejoras = typeof data.contribucionMejoras === 'string' ? 
    parseFloat(data.contribucionMejoras) : data.contribucionMejoras;

  const valorBase = Math.max(valorTransferencia, avaluoCatastral);
  const utilidadBruta = valorBase - (
    valorAdquisicion +
    mejoras +
    contribucionMejoras
  );

  const añosTranscurridos = calcularAños(data.fechaAdquisicion, data.fechaTransferencia);
  const deduccionTiempo = utilidadBruta * 0.05 * añosTranscurridos;
  const baseImponibleUtilidad = utilidadBruta - deduccionTiempo;

  let tarifaUtilidad: number;
  if (data.tipoTransferencia === 'Donación') {
    tarifaUtilidad = 0.01;
  } else if (data.tipoTransferente === 'Inmobiliaria') {
    tarifaUtilidad = 0.04;
  } else {
    tarifaUtilidad = 0.10;
  }

  const impuestoUtilidad = Math.round(baseImponibleUtilidad * tarifaUtilidad * 100) / 100;

  const baseImponibleAlcabala = Math.max(valorTransferencia, avaluoCatastral);
  const tarifaAlcabala = 0.01;
  const rebajaAlcabala = calcularRebajaAlcabala(data.fechaAdquisicion, data.fechaTransferencia);
  const impuestoAlcabala = Math.round(baseImponibleAlcabala * tarifaAlcabala * (1 - rebajaAlcabala) * 100) / 100;

  return {
    utilidad: {
      utilidadBruta: Math.round(utilidadBruta * 100) / 100,
      añosTranscurridos,
      deduccionTiempo: Math.round(deduccionTiempo * 100) / 100,
      baseImponible: Math.round(baseImponibleUtilidad * 100) / 100,
      tarifa: (tarifaUtilidad * 100).toFixed(1) + '%',
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
