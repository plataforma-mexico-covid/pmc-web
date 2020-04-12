import { UsuarioActivo } from './../../entidades/usuario';
import { Injectable } from '@angular/core';
@Injectable()
export class GlobalsComponent {
  public usuario = new UsuarioActivo();
  public cargando = false;
}

