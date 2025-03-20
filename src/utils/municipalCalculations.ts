// Funciones de cálculo para impuestos municipales

export type TipoTransferencia = 'Compraventa' | 'Donación' | 'Dación en pago';
export type TipoTransferente = 'Natural' | 'Inmobiliaria';

export interface MunicipalFormData {
  fechaAdquisicion: string;
  fechaTransferencia: string;
  valorTransferencia: number | string;
  valorAdquisicion: number | string;
  avaluoCatastral: number | string;
  tipoTransferencia: TipoTransferencia;
  tipoTransferente: TipoTransferente;
  mejoras: number | string;
  contribucionMejoras: number | string;
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
  console.log("Datos recibidos para cálculo:", formData);

  // Convertir valores de string a number si es necesario
  const valorTransferencia = typeof formData.valorTransferencia === 'string' 
    ? parseFloat(formData.valorTransferencia) || 0 
    : formData.valorTransferencia;
  
  const valorAdquisicion = typeof formData.valorAdquisicion === 'string' 
    ? parseFloat(formData.valorAdquisicion) || 0 
    : formData.valorAdquisicion;
  
  const avaluoCatastral = typeof formData.avaluoCatastral === 'string' 
    ? parseFloat(formData.avaluoCatastral) || 0 
    : formData.avaluoCatastral;
  
  const mejoras = typeof formData.mejoras === 'string' 
    ? parseFloat(formData.mejoras) || 0 
    : formData.mejoras;
  
  const contribucionMejoras = typeof formData.contribucionMejoras === 'string' 
    ? parseFloat(formData.contribucionMejoras) || 0 
    : formData.contribucionMejoras;

  // 1. Cálculo de Utilidad
  // Para la utilidad, usamos el valor de transferencia (no el máximo con el avalúo)
  const utilidadBruta = valorTransferencia - (
    valorAdquisicion +
    mejoras +
    contribucionMejoras
  );

  const añosTranscurridos = calcularAños(formData.fechaAdquisicion, formData.fechaTransferencia);
  
  // La deducción por tiempo solo se aplica si hay utilidad positiva
  const deduccionTiempo = utilidadBruta > 0 ? utilidadBruta * 0.05 * añosTranscurridos : 0;
  
  // La base imponible no puede ser negativa
  const baseImponibleUtilidad = Math.max(0, utilidadBruta - deduccionTiempo);

  // Determinar tarifa de utilidad
  let tarifaUtilidad: number;
  if (formData.tipoTransferencia === 'Donación') {
    tarifaUtilidad = 0.01; // 1%
  } else if (formData.tipoTransferente === 'Inmobiliaria') {
    tarifaUtilidad = 0.04; // 4%
  } else {
    tarifaUtilidad = 0.10; // 10% para persona natural
  }

  // Debugging
  console.log('Valores de cálculo:', {
    valorTransferencia: formData.valorTransferencia,
    valorAdquisicion: formData.valorAdquisicion,
    utilidadBruta,
    añosTranscurridos,
    deduccionTiempo,
    baseImponibleUtilidad,
    tarifaUtilidad,
    tipoTransferente: formData.tipoTransferente
  });

  // Calcular impuesto a la utilidad (redondeado a 2 decimales)
  const impuestoUtilidad = Math.round(baseImponibleUtilidad * tarifaUtilidad * 100) / 100;

  // 2. Cálculo de Alcabala
  // Para alcabala, usamos el mayor entre valor de transferencia y avalúo catastral
  const baseImponibleAlcabala = Math.max(valorTransferencia, avaluoCatastral);
  const tarifaAlcabala = 0.01; // 1%
  const rebajaAlcabala = calcularRebajaAlcabala(formData.fechaAdquisicion, formData.fechaTransferencia);
  const impuestoAlcabala = Math.round(baseImponibleAlcabala * tarifaAlcabala * (1 - rebajaAlcabala) * 100) / 100;

  const resultado = {
    utilidad: {
      utilidadBruta: Math.round(utilidadBruta * 100) / 100,
      añosTranscurridos,
      deduccionTiempo: Math.round(deduccionTiempo * 100) / 100,
      baseImponible: Math.round(baseImponibleUtilidad * 100) / 100,
      tarifa: tarifaUtilidad * 100 + '%', // Aseguramos que se muestre como porcentaje
      impuesto: impuestoUtilidad
    },
    alcabala: {
      baseImponible: Math.round(baseImponibleAlcabala * 100) / 100,
      rebaja: (rebajaAlcabala * 100).toFixed(0) + '%',
      impuesto: impuestoAlcabala
    },
    total: Math.round((impuestoUtilidad + impuestoAlcabala) * 100) / 100
  };

  console.log("Resultado del cálculo:", resultado);
  return resultado;
}
