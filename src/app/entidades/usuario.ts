export class Usuario {
  username: string;
  username_n: string;
  email: string;
  password: string;
  password2: string;
  password_confirm: string;
  nombre: string;
  materno: string;
  paterno: string;
  apellido: string;
  medio_contacto: string;
  tel: string;
  contactInfos: Array<ContactInfos>;

  constructor() {
    this.username = '';
    this.password = '';
    this.password_confirm = '';
    this.nombre = '';
    this.apellido = '';
    this.medio_contacto = '';
    this.tel = '';
    this.materno = '';
    this.contactInfos = new Array<ContactInfos>();
    this.password2 = '';
    this.username_n = '';
    this.paterno = '';
  }
}

export class ContactInfos {
  contacto: string;
  tipoContacto: string;
}

export class UsuarioActivo {
  username: string;
  email: string;
  roles: Array<any>;
  token: string;
  fullname: string;
}

export class CambioPassword {
  token: string;
  password: string;
  confirmation: string;
}
