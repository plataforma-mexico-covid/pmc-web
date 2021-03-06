import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../../componentes/global/constants.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CambioPassword } from '../../entidades/usuario';
import { ServiciosService } from '../../componentes/servicios.service';
import { showNotification, ValidarContrasena } from '../../utils/util';

@Component({
  selector: 'app-cambia-password',
  templateUrl: './cambia-password.component.html',
  styleUrls: ['./cambia-password.component.css']
})
export class CambiaPasswordComponent implements OnInit {

  public passwordCambiado: boolean;
  public cambioPassword = new CambioPassword();

  public form = new FormGroup({
    password: new FormControl('', [Validators.required, ValidarContrasena]),
    confirmation: new FormControl('', [Validators.required, ValidarContrasena])
  });

  constructor( private _activatedRoute: ActivatedRoute,
               public constantes: ConstantsService,
               private presentationServices: ServiciosService ) {

    this._activatedRoute.params.subscribe(params => {
      this.cambioPassword.token = params['token'];
    });
  }

  ngOnInit() {
    this.passwordCambiado = false;
  }

  cambiarPassword() {
    this.constantes.isLoading = true;
    this.presentationServices.cambioPassword(this.cambioPassword).subscribe(
      (data: any) => {
        this.constantes.isLoading = false;
        this.passwordCambiado = true;
      },
      (error) => {
        showNotification(error);
        this.constantes.isLoading = false;
      }
    );
  }
}