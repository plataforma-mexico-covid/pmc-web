import { Component, Output, EventEmitter } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ContactInfos, Usuario } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
import { ConstantsService } from '../global/constants.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-registro-inicio',
  templateUrl: './registro-inicio.component.html',
  styleUrls: ['./registro-inicio.component.css']
})
export class RegistroInicioComponent {
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
  public usuario = new Usuario();
  @Output() cargaAyudas = new EventEmitter();
  public fomulario_inicio_session = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', Validators.required)
  });

  constructor( private _servicio: ServiciosService,
               public constantes: ConstantsService,
               private globales: GlobalsComponent ) {
    this.usuario.contactInfos.push(new ContactInfos());
    this.usuario.contactInfos[0].tipoContacto = '';
    this.usuario.email = 'citizen_uno@pmc.mx';
    this.usuario.username = 'citizen_uno@pmc.mx';
    this.usuario.password = 'p4Ssword';
  }

  iniciarSession() {
    this.constantes.isLoading = true;
    this._servicio.iniciarSession(this.usuario).subscribe(
      (data: any) => {
        // localStorage.setItem('token', data.token);
        if ( data.token ) {
          $('#exampleModal').modal('hide');
          this.constantes.isLoading = false;
          this.globales.usuario = data;
          console.log(this.globales.usuario);
          // this.getTiposAyuda();
          this.cargaAyudas.emit();
          $('#ayudaModal').modal('show');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrio un problema al iniciar sessión',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
      },
      (error) => {
        this.constantes.isLoading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un problema al iniciar sessión',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    );
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
            confirmButtonText: 'Cool'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrio un problema registrar el usuario',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }

        this.constantes.isLoading = false;
        console.log(error);
      }
    );
  }

  getTiposAyuda() {
    this._servicio.getTiposAyuda().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {

      }
    );
  }

  private validarContrasena(control: AbstractControl) {
    const contrasena = control.value;
    let error = null;
    const regex = new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/);
    if (!regex.test(contrasena)) {
      error = 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico';
    }
    console.log(error);
    return error;
  }
}
