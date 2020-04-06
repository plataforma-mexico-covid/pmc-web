import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/componentes/servicios.service';
@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})

export class ConfirmacionComponent {
  validacion_correcta = false;
  token: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _servicios: ServiciosService
  ) {
    debugger
    this._activatedRoute.params.subscribe(token => {
      this.token = token['token'];
      this.validarCorreo();
    });
  }

  validarCorreo() {
    this._servicios.valdiarTokenCorreo(this.token).subscribe((data) => {
      this.validacion_correcta = true;
    }, error => {
      this.validacion_correcta = false;
    });
  }

}
