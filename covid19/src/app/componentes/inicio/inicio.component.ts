import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ContactInfos, Usuario } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
import { ConstantsService } from '../global/constants.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  public usuario = new Usuario();
  @Output() loginCorrecto = new EventEmitter();


  public fomulario_inicio_session = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private _servicio: ServiciosService,
    public constantes: ConstantsService,
    private globales: GlobalsComponent) {
    this.usuario.contactInfos.push(new ContactInfos());
    this.usuario.contactInfos[0].tipoContacto = '';
    this.usuario.email = '';
    this.usuario.username = '';
    this.usuario.password = '';
  }

  iniciarSession() {
    this.constantes.isLoading = true;
    this._servicio.iniciarSession(this.usuario).subscribe(
      (data: any) => {
        // localStorage.setItem('token', data.token);
        if (data.token) {
          $('#exampleModal').modal('hide');
          this.constantes.isLoading = false;
          this.globales.usuario = data;
          this.loginCorrecto.emit();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrio un problema al iniciar sessión',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        this.constantes.isLoading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un problema al iniciar sessión',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    );
  }

  openWelcomeModal() {
    console.log(this.globales);
    $('#welcomeModal').modal('show');
  }

}