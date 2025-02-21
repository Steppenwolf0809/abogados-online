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
  const utilidadBruta = valorTransferencia - (
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
  } else if (new Date(fechaAdquisicion) >= new Date('2006-01-01')) {
    tarifaUtilidad = tipoTransferente === 'Inmobiliaria' ? 0.04 : 0.005; // 4% o 0.5%
  } else {
    tarifaUtilidad = 0.10; // 10%
  }

  const impuestoUtilidad = baseImponibleUtilidad * tarifaUtilidad;

  // 2. Cálculo de Alcabala
  const baseImponibleAlcabala = Math.max(valorTransferencia, avaluoCatastral);
  const tarifaAlcabala = 0.01; // 1%
  const rebajaAlcabala = calcularRebajaAlcabala(fechaAdquisicion, fechaTransferencia);
  const impuestoAlcabala = baseImponibleAlcabala * tarifaAlcabala * (1 - rebajaAlcabala);

  return {
    utilidad: {
      utilidadBruta: utilidadBruta.toFixed(2),
      añosTranscurridos,
      deduccionTiempo: deduccionTiempo.toFixed(2),
      baseImponible: baseImponibleUtilidad.toFixed(2),
      tarifa: (tarifaUtilidad * 100).toFixed(1) + '%',
      impuesto: impuestoUtilidad.toFixed(2)
    },
    alcabala: {
      baseImponible: baseImponibleAlcabala.toFixed(2),
      rebaja: (rebajaAlcabala * 100).toFixed(0) + '%',
      impuesto: impuestoAlcabala.toFixed(2)
    },
    total: (impuestoUtilidad + impuestoAlcabala).toFixed(2)
  };
}
