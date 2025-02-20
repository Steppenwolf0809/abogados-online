// Funciones de cálculo para impuestos municipales

export function calcularAños(fechaAdquisicion, fechaTransferencia) {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);
  const diferencia = transferencia.getFullYear() - adquisicion.getFullYear();
  return Math.min(diferencia, 20); // Máximo 20 años
}

export function calcularMeses(fechaAdquisicion, fechaTransferencia) {
  const adquisicion = new Date(fechaAdquisicion);
  const transferencia = new Date(fechaTransferencia);
  const diferencia = (transferencia - adquisicion) / (1000 * 60 * 60 * 24 * 30.44);
  return Math.floor(diferencia);
}

export function calcularRebajaAlcabala(fechaAdquisicion, fechaTransferencia) {
  const mesesTranscurridos = calcularMeses(fechaAdquisicion, fechaTransferencia);
  
  if (mesesTranscurridos <= 12) return 0.40; // 40% primer año
  if (mesesTranscurridos <= 24) return 0.30; // 30% segundo año
  if (mesesTranscurridos <= 36) return 0.20; // 20% tercer año
  return 0; // Sin rebaja
}

export function calcularImpuestos({
  fechaAdquisicion,
  fechaTransferencia,
  valorTransferencia,
  valorAdquisicion,
  avaluoCatastral,
  tipoTransferencia,
  tipoTransferente,
  mejoras,
  contribucionMejoras
}) {
  // 1. Cálculo de Utilidad
  const valorBase = Math.max(valorTransferencia, avaluoCatastral);
  const utilidadBruta = valorBase - (
    valorAdquisicion +
    mejoras +
    contribucionMejoras
  );

  const añosTranscurridos = calcularAños(fechaAdquisicion, fechaTransferencia);
  const deduccionTiempo = utilidadBruta * 0.05 * añosTranscurridos;
  const baseImponibleUtilidad = utilidadBruta - deduccionTiempo;

  // Determinar tarifa de utilidad
  let tarifaUtilidad;
  if (tipoTransferencia === 'Donación') {
    tarifaUtilidad = 0.01; // 1%
  } else if (tipoTransferente === 'Inmobiliaria') {
    tarifaUtilidad = 0.04; // 4%
  } else {
    tarifaUtilidad = 0.10; // 10% para persona natural
  }

  const impuestoUtilidad = Math.round(baseImponibleUtilidad * tarifaUtilidad * 100) / 100;

  // 2. Cálculo de Alcabala
  const baseImponibleAlcabala = Math.max(valorTransferencia, avaluoCatastral);
  const tarifaAlcabala = 0.01; // 1%
  const rebajaAlcabala = calcularRebajaAlcabala(fechaAdquisicion, fechaTransferencia);
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
