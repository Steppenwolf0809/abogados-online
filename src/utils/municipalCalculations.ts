interface CalculoImpuestosParams {
  fechaAdquisicion: string;
  fechaTransferencia: string;
  valorTransferencia: number;
  valorAdquisicion: number;
  avaluoCatastral: number;
  tipoTransferencia: string;
  tipoTransferente: string;
  mejoras: number;
  contribucionMejoras: number;
}

interface ResultadoImpuestos {
  utilidad: {
    utilidadBruta: number;
    añosTranscurridos: number;
    deduccionTiempo: number;
    baseImponible: number;
    tarifa: string;
    impuesto: number;
  };
  alcabala: {
    baseImponible: number;
    rebaja: string;
    impuesto: number;
  };
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

export function calcularImpuestos(params: CalculoImpuestosParams): ResultadoImpuestos {
  const valorBase = Math.max(params.valorTransferencia, params.avaluoCatastral);
  const utilidadBruta = valorBase - (
    params.valorAdquisicion +
    params.mejoras +
    params.contribucionMejoras
  );

  const añosTranscurridos = calcularAños(params.fechaAdquisicion, params.fechaTransferencia);
  const deduccionTiempo = utilidadBruta * 0.05 * añosTranscurridos;
  const baseImponibleUtilidad = utilidadBruta - deduccionTiempo;

  let tarifaUtilidad: number;
  if (params.tipoTransferencia === 'Donación') {
    tarifaUtilidad = 0.01;
  } else if (params.tipoTransferente === 'Inmobiliaria') {
    tarifaUtilidad = 0.04;
  } else {
    tarifaUtilidad = 0.10;
  }

  const impuestoUtilidad = Math.round(baseImponibleUtilidad * tarifaUtilidad * 100) / 100;

  const baseImponibleAlcabala = Math.max(params.valorTransferencia, params.avaluoCatastral);
  const tarifaAlcabala = 0.01;
  const rebajaAlcabala = calcularRebajaAlcabala(params.fechaAdquisicion, params.fechaTransferencia);
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

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
