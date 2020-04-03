import { GlobalsComponent } from './../global/global.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantsService } from '../global/constants.service';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() setOrigenContactar = new EventEmitter();

  constructor(
    private _contantes: ConstantsService,
    private globales: GlobalsComponent
  ) { }

  origenAyuda(tipo: string) {
    console.log(this.globales);
    this.setOrigenContactar.emit(false);
    if (this.globales.usuario.token) {
      $('#ayudaModal').modal('show');
    } else {
      $('#exampleModal').modal('show');
    }
    this._contantes.origen_ayudar = tipo;
  }
}
