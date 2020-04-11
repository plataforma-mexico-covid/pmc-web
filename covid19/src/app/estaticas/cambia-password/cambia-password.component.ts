import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../../componentes/global/constants.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Usuario, CambioPassword } from '../../entidades/usuario';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../componentes/servicios.service';
import { NotificationMessage, showNotification } from '../../utils/util';

@Component({
  selector: 'app-cambia-password',
  templateUrl: './cambia-password.component.html',
  styleUrls: ['./cambia-password.component.css']
})
export class CambiaPasswordComponent implements OnInit {

  public passwordCambiado: boolean;
  public cambioPassword = new CambioPassword();

  public form = new FormGroup({
    password: new FormControl('', [Validators.required, this.validarContrasena]),
    confirmation: new FormControl('', [Validators.required, this.validarContrasena])
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

  private validarContrasena(control: AbstractControl) {
    const contrasena = control.value;
    let error = null;
    const regex = new RegExp(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[-*_#@().!%&])[a-zA-Z0-9!@#\$%^&*](?=\S+$).{8,15}$/);
    if (!regex.test(contrasena)) {
      error = 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico';
    }
    console.log(error);
    return error;
  }

}