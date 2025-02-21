interface ResultadoImpuestos {
  total: number;
  desglose: {
    [key: string]: number;
  };
}

export function calcularImpuestos(
  avaluo: number,
  anioCompra: number,
  anioVenta: number,
  tipoPropiedad: string
): ResultadoImpuestos {
  // Cálculo de la utilidad
  const aniosTranscurridos = anioVenta - anioCompra;
  const utilidad = avaluo * 0.05 * aniosTranscurridos;

  // Cálculo del impuesto de alcabala (1%)
  const alcabala = avaluo * 0.01;

  // Cálculo del impuesto a la utilidad (10%)
  const impuestoUtilidad = utilidad * 0.10;

  // Ajuste según tipo de propiedad
  const factorTipo = tipoPropiedad === 'rural' ? 0.8 : 1;

  // Cálculo del total con ajuste por tipo de propiedad
  const totalAjustado = (alcabala + impuestoUtilidad) * factorTipo;

  return {
    total: Number(totalAjustado.toFixed(2)),
    desglose: {
      'Impuesto de Alcabala': Number(alcabala.toFixed(2)),
      'Impuesto a la Utilidad': Number(impuestoUtilidad.toFixed(2)),
      'Ajuste por Tipo de Propiedad': Number((totalAjustado - (alcabala + impuestoUtilidad)).toFixed(2))
    }
  };
}
