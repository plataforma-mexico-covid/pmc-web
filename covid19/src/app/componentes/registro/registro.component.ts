import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ContactInfos, Usuario } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
import { ConstantsService } from '../global/constants.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public usuario = new Usuario();

  public formulario_crear_usuario = new FormGroup({
    username_n: new FormControl('', [Validators.required, Validators.email]),
    password2: new FormControl('', [Validators.required, this.validarContrasena]),
    password_confirm: new FormControl('', [Validators.required, this.validarContrasena]),
    nombre: new FormControl('', Validators.required),
    paterno: new FormControl('', Validators.required),
    materno: new FormControl('', Validators.required),
    tipoContacto: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required)
  });

  constructor(private _servicio: ServiciosService,
    public constantes: ConstantsService,
    private globales: GlobalsComponent) {
    this.usuario.contactInfos.push(new ContactInfos());
    this.usuario.contactInfos[0].tipoContacto = '';
  }

  openWelcomeModal() {
    console.log(this.globales);
    $('#welcomeModal').modal('show');
  }

  registro() {
    this.constantes.isLoading = true;
    const aux = {
      contactInfos: [{
        contacto: this.usuario.contactInfos[0].contacto,
        tipoContacto: this.usuario.contactInfos[0].tipoContacto
      }],
      materno: this.usuario.materno,
      nombre: this.usuario.nombre,
      password: this.usuario.password2,
      paterno: this.usuario.paterno,
      username: this.usuario.username_n
    };
    this._servicio.registro(aux).subscribe(
      (data: any) => {
        Swal.fire(
          '!Completado!',
          'Te hemos enviado un correo eletrónico de confirmación.',
          'success'
        );
        this.constantes.isLoading = false;
        localStorage.setItem('token', data.token);
      },
      (error) => {
        if (error.error.message) {
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrio un problema registrar el usuario',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }

        this.constantes.isLoading = false;
        console.log(error);
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