import { GlobalsComponent } from './../global/global.component';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../global/constants.service';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private _contantes: ConstantsService,
    private globales: GlobalsComponent
  ) { }

  origenAyuda( tipo: string ) {
      console.log(this.globales);
      if ( this.globales.usuario.token ) {
          $('#ayudaModal').modal('show');
      } else {
        $('#exampleModal').modal('show');
      }
      this._contantes.origen_ayudar = tipo;
  }

}
