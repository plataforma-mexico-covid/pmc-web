export class Ubicacion {
    calle: string;
    codigoPostal: string;
    colonia: string;
    estado: string;
    id: number;
    idEstado: number;
    idMunicipio: number;
    latitude: number;
    longitude: number;
    municipio: string;
    noExterior: string;
    noInterior: string;
}

export class TipoAyuda {
    id: number;
    nombre: string
}

export class Contacto {
    contacto: string;
    id: number;
    tipoContacto: TiposContacto;
}

export class Ciudadano {
    contactos: Contacto[];
    id: number;
    materno: string;
    nombre: string;
    paterno: string;
    nombreCompleto: string;
    username: string;
}

export class Ayuda {
    ciudadano: Ciudadano;
    descripcion: string;
    descCorta: string;
    fechaRegistro: string;
    id: number;
    origenAyuda: OrigenesAyuda | string;
    tipoAyuda: TipoAyuda;
    ubicacion: Ubicacion;
    direccion: string;
    estatusAyuda: EstatusAyuda | string;
    campana: string;
    medio: string;
    origen: string;
    isUserLogIn: boolean;
}

export class Peticion {
    id: number;
    ayuda: Ayuda;
    ciudadano: Ciudadano;
    ayudaMatch: Ayuda;
    tipoMatch: TipoMatch | string;
    fechaPeticion: string;
}

export class InfoSensible {
    username: string;
    contactos: Contacto[];
    matchs: Peticion[];
}

export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
  }

enum EstatusAyuda {
    "NUEVA", "PENDIENTE", "EN_PROGRESO", "CANCELADA", "COMPLETEDA"
}

enum OrigenesAyuda {
    "OFRECE", "SOLICITA"
}

enum TiposContacto {
    "TELEFONO", "TWITTER", "FACEBOOK", "SKYPE", "OTRO"
}

enum TipoMatch {
    "AUTOMATIC", "MANUAL"
}
