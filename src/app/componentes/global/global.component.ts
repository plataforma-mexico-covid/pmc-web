import { UsuarioActivo } from './../../entidades/usuario';
import { Injectable } from '@angular/core';
@Injectable()
export class GlobalsComponent {
  public usuario = new UsuarioActivo();
  public cargando = false;

  private getAlreadyLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  public getTokenAlreadyLoggedIn(): string {
    return this.getAlreadyLoggedIn().token;
  }
}

