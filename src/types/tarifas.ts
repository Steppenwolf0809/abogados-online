interface Rango {
  min: number;
  max: number;
  tarifa: number;
}

interface Formula {
  base: string;
  porcentajeExcedente: number;
}

interface Excedente {
  limite: number;
  formula: Formula;
}

interface TablaServicio {
  rangos: Rango[];
  excedente?: Excedente;
}

interface ServicioPersona {
  tarifa: number;
  otorganteAdicional?: number;
  firmanteAdicional?: number;
}

interface ServicioSimple {
  tarifa: number;
}

interface ServiciosIndeterminados {
  poderes: {
    personaNatural: ServicioPersona;
    personaJuridica: ServicioSimple;
  };
  declaracionesJuramentadas: {
    personaNatural: ServicioPersona;
    personaJuridica: ServicioSimple;
  };
  autorizacionSalidaPais: ServicioSimple;
  reconocimientoFirma: ServicioSimple;
  testamentoAbierto: ServicioSimple;
  testamentoCerrado: ServicioSimple;
  unionHecho: ServicioSimple;
  disolucionSociedadConyugal: ServicioSimple;
  copiaCertificada: ServicioSimple;
  materializacion: ServicioSimple;
  posesionEfectiva: ServicioSimple;
  protocolizacion: ServicioSimple;
  compraventaVehiculos: ServicioPersona;
}

export interface Tablas {
  transferenciaDominio: TablaServicio;
  hipotecas: TablaServicio;
  promesas: TablaServicio;
  contratos_arriendo: TablaServicio;
}

export interface Tarifas {
  remuneracionBasica: number;
  iva: number;
  tablas: Tablas;
  serviciosIndeterminados: ServiciosIndeterminados;
}

export type TipoServicioConCuantia = keyof Tablas;
export type TipoServicioSinCuantia = keyof ServiciosIndeterminados;
export type TipoServicio = TipoServicioConCuantia | TipoServicioSinCuantia;

export const esTipoServicioConCuantia = (tipo: TipoServicio): tipo is TipoServicioConCuantia => {
  return ['transferenciaDominio', 'hipotecas', 'promesas', 'contratos_arriendo'].includes(tipo as string);
};

export const esTipoServicioSinCuantia = (tipo: TipoServicio): tipo is TipoServicioSinCuantia => {
  return !esTipoServicioConCuantia(tipo);
};
