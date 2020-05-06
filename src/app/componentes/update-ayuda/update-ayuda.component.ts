import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ayuda, TipoAyuda, Ciudadano } from 'src/app/entidades';
import { DataShareService } from '../../services/data-share.service';
import { ServiciosService } from '../servicios.service';
import { ConstantsService } from './../global/constants.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-update-ayuda',
  templateUrl: './update-ayuda.component.html',
  styleUrls: ['./update-ayuda.component.css']
})
export class UpdateAyudaComponent implements OnInit {

  tipoAyudas: TipoAyuda[];
  public ayuda = new Ayuda();
  public form_update_ayuda = new FormGroup({
    nombreCompleto: new FormControl('', Validators.required),
    tipoAyuda: new FormControl('', Validators.required),
    origenAyuda: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(
    private _dataShare: DataShareService,
    private _servicio: ServiciosService,
    public _constantes: ConstantsService
  ) {
    this.ayuda.ciudadano = new Ciudadano();
    this.ayuda.tipoAyuda = new TipoAyuda();
   }

  ngOnInit() {
    this._dataShare.currentAyuda.subscribe(ayuda => Object.assign(this.ayuda, ayuda))
    this._dataShare.currentTipoAyuda.subscribe(tipoAyudas => this.tipoAyudas = tipoAyudas)
  }

  actualizaTipoAyuda(event) {
    this.ayuda.tipoAyuda.nombre = this.tipoAyudas.filter(x => x.id === Number(event.target.value))[0].nombre;
  }

  updateAyuda() {
    this._servicio.actualizarAyuda(this.ayuda).subscribe(
      (data) => {
        this._constantes.isLoading = false;
        Swal.fire(
          '!Completado!',
          'La ayuda fue actualizada con exito.',
          'success'
        );
        this.ayuda = new Ayuda();
        $('#ayudaUpdateModal').modal('hide');
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: error.error.notifications && error.error.notifications[0].message ? error.error.notifications[0].message : 'Ocurrio un error desconocido.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        this._constantes.isLoading = false;
      }
    );
  }

}
