// Tabla de rangos para cálculo de aranceles
export const RANGOS = [
    { min: 0.01, max: 3000.00, arancel: 22.00 },
    { min: 3000.01, max: 6600.00, arancel: 30.00 },
    { min: 6600.01, max: 10000.00, arancel: 35.00 },
    { min: 10000.01, max: 15000.00, arancel: 40.00 },
    { min: 15000.01, max: 25000.00, arancel: 50.00 },
    { min: 25000.01, max: 30000.00, arancel: 100.00 },
    { min: 30000.01, max: 35000.00, arancel: 160.00 },
    { min: 35000.01, max: 40000.00, arancel: 200.00 },
    { min: 40000.01, max: Infinity, baseArancel: 100.00, porcentajeExceso: 0.005 }
];

// Función para calcular el arancel base
export function calcularArancel(valorContrato) {
    // Validar que el valor sea positivo
    if (valorContrato <= 0) return 0;

    let arancel;
    let rangoAplicado;
    let exceso = 0;
    
    // Si es rango 9 (último rango)
    if (valorContrato > 40000.01) {
        exceso = valorContrato - 10000.00;
        arancel = 100.00 + (exceso * 0.005); // 0.5%
        rangoAplicado = RANGOS[8];
    } else {
        rangoAplicado = RANGOS.find(r => 
            valorContrato >= r.min && valorContrato <= r.max
        );
        arancel = rangoAplicado.arancel;
    }

    // Aplicar límite máximo
    const arancelFinal = Math.min(arancel, 500.00);

    return {
        arancel: arancelFinal,
        rango: RANGOS.indexOf(rangoAplicado) + 1,
        exceso: exceso > 0 ? exceso : null,
        excedeMaximo: arancel > 500.00
    };
}

// Función para aplicar descuentos
export function aplicarDescuentos(arancelBase, esTerceraEdad) {
    let arancelFinal = arancelBase;
    let descuentos = [];
    
    // Aplicar descuento tercera edad
    if (esTerceraEdad) {
        const descuentoTerceraEdad = arancelFinal * 0.5;
        descuentos.push({
            tipo: 'Tercera Edad (50%)',
            valor: descuentoTerceraEdad
        });
        arancelFinal = arancelFinal * 0.5; // 50% de descuento
    }
    
    return {
        arancelFinal,
        descuentos
    };
}

// Función para formatear valores monetarios
export function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

// Función principal que combina todos los cálculos
export function calcularArancelFinal(valorContrato, esTerceraEdad) {
    const calculoBase = calcularArancel(valorContrato);
    const { arancelFinal, descuentos } = aplicarDescuentos(calculoBase.arancel, esTerceraEdad);

    return {
        valorContrato,
        rango: calculoBase.rango,
        arancelBase: calculoBase.arancel,
        exceso: calculoBase.exceso,
        descuentos,
        arancelFinal,
        excedeMaximo: calculoBase.excedeMaximo
    };
}
