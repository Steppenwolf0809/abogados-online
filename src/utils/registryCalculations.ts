export interface Rango {
  min: number;
  max: number;
  arancel: number;
}

export interface ResultadoRegistro {
  valorContrato: number;
  rango: number;
  arancelBase: number;
  descuentoTerceraEdad: number;
  arancelFinal: number;
  excedeMaximo: boolean;
  total: number;
  desglose: {
    'Arancel Base': number;
    'Descuento Tercera Edad'?: number;
  };
}

export const RANGOS: Rango[] = [
  { min: 0.01, max: 1000, arancel: 10 },
  { min: 1000.01, max: 5000, arancel: 20 },
  { min: 5000.01, max: 10000, arancel: 35 },
  { min: 10000.01, max: 20000, arancel: 40 },
  { min: 20000.01, max: 30000, arancel: 60 },
  { min: 30000.01, max: 40000, arancel: 100 },
  { min: 40000.01, max: Infinity, arancel: 100 } // Más 0.5% del exceso de $10,000
];

export function calcularArancelBase(valor: number): { rango: number; arancel: number } {
  const rangoIndex = RANGOS.findIndex(r => valor >= r.min && valor <= r.max);
  
  if (rangoIndex === RANGOS.length - 1) {
    // Para valores superiores a $40,000.01
    const exceso = valor - 10000;
    const arancelAdicional = exceso * 0.005; // 0.5% del exceso
    return {
      rango: rangoIndex + 1,
      arancel: Math.min(RANGOS[rangoIndex].arancel + arancelAdicional, 500) // Máximo $500
    };
  }

  return {
    rango: rangoIndex + 1,
    arancel: RANGOS[rangoIndex].arancel
  };
}

export function calcularArancelFinal(valor: number, terceraEdad: boolean): ResultadoRegistro {
  const { rango, arancel: arancelBase } = calcularArancelBase(valor);
  const descuentoTerceraEdad = terceraEdad ? arancelBase * 0.5 : 0;
  const arancelFinal = arancelBase - descuentoTerceraEdad;
  const excedeMaximo = arancelBase >= 500;

  const desglose: ResultadoRegistro['desglose'] = {
    'Arancel Base': arancelBase
  };

  if (descuentoTerceraEdad > 0) {
    desglose['Descuento Tercera Edad'] = descuentoTerceraEdad;
  }

  return {
    valorContrato: valor,
    rango,
    arancelBase,
    descuentoTerceraEdad,
    arancelFinal,
    excedeMaximo,
    total: arancelFinal,
    desglose
  };
}
