export interface Tarifas {
  remuneracionBasica: number;
  iva: number;
  tablas: {
    [key: string]: {
      rangos: {
        min: number;
        max: number;
        tarifa: number;
      }[];
      excedente?: {
        limite: number;
        formula: {
          base: string;
          porcentajeExcedente: number;
        };
      };
    };
  };
  serviciosIndeterminados: {
    poderes: {
      personaNatural: {
        tarifa: number;
        otorganteAdicional: number;
      };
      personaJuridica: {
        tarifa: number;
      };
    };
    declaracionesJuramentadas: {
      personaNatural: {
        tarifa: number;
        otorganteAdicional: number;
      };
      personaJuridica: {
        tarifa: number;
      };
    };
    testamentoAbierto: {
      tarifa: number;
    };
    disolucionSociedadConyugal: {
      tarifa: number;
    };
    unionHecho: {
      tarifa: number;
    };
    autorizacionSalidaPais: {
      tarifa: number;
    };
    reconocimientoFirma: {
      tarifa: number;
    };
    copiaCertificada: {
      tarifa: number;
    };
    materializacion: {
      tarifa: number;
    };
    posesionEfectiva: {
      tarifa: number;
    };
    protocolizacion: {
      tarifa: number;
    };
    compraventaVehiculos: {
      tarifa: number;
      firmanteAdicional: number;
    };
  };
}

export type TipoServicio =
  | 'transferenciaDominio'
  | 'promesas'
  | 'hipotecas'
  | 'contratos_arriendo'
  | 'poderes'
  | 'declaracionesJuramentadas'
  | 'testamentoAbierto'
  | 'disolucionSociedadConyugal'
  | 'unionHecho'
  | 'autorizacionSalidaPais'
  | 'reconocimientoFirma'
  | 'copiaCertificada'
  | 'materializacion'
  | 'posesionEfectiva'
  | 'protocolizacion'
  | 'compraventaVehiculos';

export function esTipoServicioConCuantia(tipo: TipoServicio): boolean {
  return ['transferenciaDominio', 'promesas', 'hipotecas', 'contratos_arriendo'].includes(tipo);
}
