import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsService } from '../../componentes/global/constants.service';
import { GlobalsComponent } from '../../componentes/global/global.component';
import { ServiciosService } from '../../componentes/servicios.service';
import { showNotification, ValidarUsername } from '../../utils/util';
import { Usuario } from '../../entidades/usuario';

// Referencia jQuery
declare var $: any;

@Component({
  selector: 'app-recuperacion-password',
  templateUrl: './recuperacion-password.component.html',
  styleUrls: ['./recuperacion-password.component.css']
})
export class RecuperacionPasswordComponent implements OnInit {
  public recuperacionEnviada: boolean;
  public usuario = new Usuario();
  public form = new FormGroup({
    username: new FormControl('', [Validators.required, ValidarUsername])
  });

  constructor(
    private presentationServices: ServiciosService,
    public constantes: ConstantsService,
    private globales: GlobalsComponent) {
    }

  ngOnInit() {
    this.recuperacionEnviada = false;
  }

  recuperarPassword() {
    this.constantes.isLoading = true;
    this.presentationServices.recuperacionPassword(this.usuario.username).subscribe(
      (data: any) => {
        this.constantes.isLoading = false;
        this.recuperacionEnviada = true;
      },
      (error) => {
        showNotification(error);
        this.constantes.isLoading = false;
      }
    );
  }

  cerrarModal() {
    this.form.reset();
    $('#recuperacionModal').modal('hide');
    this.recuperacionEnviada = false;
  }

  openRecuperacionModal() {
    this.recuperacionEnviada = false;
    $('#recuperacionModal').modal('show');
  }
}
