import { Injectable } from '@angular/core';
import { Ayuda } from 'src/app/entidades';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private ayudaAdminSource = new BehaviorSubject(new Ayuda());
  currentAyuda = this.ayudaAdminSource.asObservable();

  private tipoAyudasSource = new BehaviorSubject([]);
  currentTipoAyuda = this.tipoAyudasSource.asObservable();

  constructor() { }

  changeAyuda(ayuda: Ayuda) {
    this.ayudaAdminSource.next(ayuda)
  }

  changeTipoAyudas(tipoAyudas: []) {
    this.tipoAyudasSource.next(tipoAyudas)
  }
}
