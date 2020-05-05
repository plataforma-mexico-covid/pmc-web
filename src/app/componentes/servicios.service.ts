import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, CambioPassword } from '../entidades/usuario';
import { GlobalsComponent } from './global/global.component';
import { Ayuda, DataTablesResponse } from '../entidades';
import { ConstantsService } from '../componentes/global/constants.service';
//declare const RUTAS: any;


@Injectable()
export class ServiciosService {
  public rutas;
  private isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private globales: GlobalsComponent, public constantes: ConstantsService) {
    //this.rutas = RUTAS();
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get('assets/config.json').subscribe((response: any) => {
          this.rutas = response;
          resolve(true);
    });
  });
}

  iniciarSession(usuario: Usuario) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const aux = { password: usuario.password, username: usuario.username };
    return this.http.post(`${this.rutas.endpoint}/api/v1/public/login`, aux, { headers });
  }

  recuperacionPassword(username: string) {
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/users/recovery_password?username=${username}`);
  }

  cambioPassword(cambioPassword: CambioPassword) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.rutas.endpoint}/api/v1/public/users/change_password`, cambioPassword, { headers });
  }

  registro(usuario: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.rutas.endpoint}/api/v1/public/users`, usuario, { headers });
  }

  ayuda(tipo: 'AMBOS' | 'OFRECE' | 'SOLICITA', longitude: number, latitude: number, kilometers: string) {
    const token = this.globales.usuario.token ? this.globales.usuario.token : '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/ayuda/?origenAyuda=${tipo}&longitude=${longitude}&latitude=${latitude}&kilometers=${kilometers}`, { headers } );
  }
  
  adminAyuda(dataTablesParameters: DataTablesResponse) {
    const token = this.globales.usuario.token ? this.globales.usuario.token : '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/backoffice/ayuda/`, dataTablesParameters, { headers } );
  }

  getTiposAyuda() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/tipoAyuda/`, { headers });
  }

  getProvincias() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.get(`${this.rutas.endpoint}/api/v1/private/address/province`, { headers });
  }

  getMunicipios(identificador_municipio) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.get(`${this.rutas.endpoint}/api/v1/private/address/province/${identificador_municipio}/municipality`, { headers });
  }

  guardarAyuda(ayuda: Ayuda) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/ayuda`, ayuda, { headers });
  }

  guardarAyudaCiudadano(ayuda: Ayuda) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/ayuda_ciudadano`, ayuda, { headers });
  }

  valdiarTokenCorreo(token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/users/confirm?token=${token}`, { headers });
  }

  contactarAyuda(idAyuda: number, username: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/ayuda/${idAyuda}/match`, { idAyuda, username }, { headers });
  }

  finalizarAyuda(idAyuda: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/ayuda/${idAyuda}/finish`, { }, { headers });
  }

  get(url) {
    return this.http.get(url, {});
  }

  post(url, data, responseType?: any) {
    const headers = new HttpHeaders();
    return this.http.post(url, data, { headers, responseType });
  }

  put(url, data) {
    const headers = new HttpHeaders();
    return this.http.put(url, data, { headers });
  }

  delete(url) {
    const headers = new HttpHeaders();
    return this.http.delete(url, { headers });
  }

}
