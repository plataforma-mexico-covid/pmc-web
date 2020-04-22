import { Injectable } from '@angular/core';
import { Ayuda } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  isLoading = true;
  origen_ayudar = '';
  puntos_marcados = new Array<Ayuda>();
  longitud = 0;
  latitud = 0;
  direccion: string;
  tipos_ayudas : any;
}
