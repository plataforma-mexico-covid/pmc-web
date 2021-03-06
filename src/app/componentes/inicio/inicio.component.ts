import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ContactInfos, Usuario } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
import { ConstantsService } from '../global/constants.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidarUsername, ValidarContrasena } from '../../utils/util';
import {Router} from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  public usuario = new Usuario();
  @Output() actualizaAyuda = new EventEmitter();

  public fomulario_inicio_session = new FormGroup({
    username: new FormControl('', [Validators.required, ValidarUsername]),
    password: new FormControl('', [Validators.required, ValidarContrasena])
  });

  constructor(private router: Router,
    private _authService: AuthService,
    public constantes: ConstantsService,
    private globales: GlobalsComponent) {
    this.usuario.contactInfos.push(new ContactInfos());
    this.usuario.contactInfos[0].tipoContacto = '';
    this.usuario.username = '';
    this.usuario.password = '';
  }

  iniciarSession() {
    this.constantes.isLoading = true;
    this._authService.login(this.usuario)
      .then((data: any) => {
        if (data.token) {
          this.constantes.isLoading = false;
          $('#inicioModal').modal('hide');
          this.actualizaAyuda.emit();
          this.router.navigateByUrl('/maps');
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Ocurrio un problema al iniciar sessión',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      })
      .catch((error) => {
        this.constantes.isLoading = false;
        Swal.fire({
          title: '¡Error!',
          text: 'Ocurrio un problema al iniciar sessión',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    );
  }

  cerrarModal() {
    this.fomulario_inicio_session.reset();
    this.openWelcomeModal();
  }

  openWelcomeModal() {
    console.log(this.globales);
    $('#welcomeModal').modal('show');
  }

  openRecuperacionModal() {

    // Cierra el modal para inicio de sesion
    $('#inicioModal').modal('hide');

    // Abre el modal para recuperacion de password
    $('#recuperacionModal').modal('show');
  }

}
