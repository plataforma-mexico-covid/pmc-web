import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../entidades/usuario';
import { GlobalsComponent } from './global/global.component';
import { Ayuda } from '../entidades';
declare const RUTAS: any;

@Injectable()
export class ServiciosService {
  public rutas;
  private isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private globales: GlobalsComponent ) {
    this.rutas = RUTAS();
  }


  iniciarSession(usuario: Usuario) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const aux = { password: usuario.password, username: usuario.username };
    return this.http.post(`${this.rutas.endpoint}/api/v1/public/login`, aux, { headers });
  }

  registro(usuario: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.rutas.endpoint}/api/v1/public/users`, usuario, { headers });
  }

  ayuda(tipo: 'AMBOS' | 'OFRECE' | 'SOLICITA', longitude: number, latitude: number, kilometers: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/ayuda/?origenAyuda=${tipo}&longitude=${longitude}&latitude=${latitude}&kilometers=${kilometers}`);
  }

  getTiposAyuda() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.get(`${this.rutas.endpoint}/api/v1/private/tipoAyuda/`, { headers });
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

  valdiarTokenCorreo(token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.rutas.endpoint}/api/v1/public/users/confirm?token=${token}`, { headers });
  }

  contactarAyuda(idAyuda: number, username: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Auth-Token': this.globales.usuario.token });
    return this.http.post(`${this.rutas.endpoint}/api/v1/private/ayuda/${idAyuda}/match`, { idAyuda, username }, { headers });
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
