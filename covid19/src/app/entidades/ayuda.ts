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
}

export class Ayuda {
    ciudadano: Ciudadano;
    descripcion: string;
    fechaRegistro: string;
    id: number;
    origenAyuda: OrigenesAyuda | string;
    tipoAyuda: TipoAyuda;
    ubicacion: Ubicacion;
    direccion: string;
    isUserLogIn: boolean;
}


enum OrigenesAyuda {
    "OFRECE", "SOLICITA"
}

enum TiposContacto {
    "TELEFONO", "TWITTER", "FACEBOOK", "SKYPE", "OTRO"
}
