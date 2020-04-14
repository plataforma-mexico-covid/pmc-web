import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../servicios.service';
import { ConstantsService } from './../global/constants.service';
import { Ayuda, Ciudadano, Ubicacion, TipoAyuda, Contacto } from 'src/app/entidades';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-ayuda-ciudadano',
  templateUrl: './ayuda-ciudadano.component.html',
  styleUrls: ['./ayuda-ciudadano.component.css']
})
export class AyudaCiudadanoComponent implements OnInit {

  @Input() tipoAyuda: any;
  @Output() actualizaMapa = new EventEmitter();
  public ayuda = new Ayuda();
  public form_ayuda_ciudadano = new FormGroup({
    nombre: new FormControl('', Validators.required),
    paterno: new FormControl('', Validators.required),
    materno: new FormControl(''),
    tipoContacto: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    tipoAyuda: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(
    private _servicio: ServiciosService,
    public _constantes: ConstantsService
  ) { 
    this.inicializaVariables();
  }

  ngOnInit() {
  }

  actualizaTipoAyuda(event) {
    this.ayuda.tipoAyuda.nombre = this.tipoAyuda.filter(x => x.id === Number(event.target.value))[0].nombre;
  }

  inicializaVariables() {
    this.ayuda.ciudadano = new Ciudadano();
    this.ayuda.ubicacion = new Ubicacion();
    this.ayuda.tipoAyuda = new TipoAyuda();
    this.ayuda.ciudadano.contactos = new Array<Contacto>();
    this.ayuda.ciudadano.contactos.push(new Contacto());
    const f = new Date();
    const fecha = ('00' + f.getDate()).slice(-2)
      + '/' + ('00' + (f.getMonth() + 1)).slice(-2)
      + '/' + f.getFullYear() + ' '
      + ('00' + f.getHours()).slice(-2) + ':'
      + ('00' + f.getMinutes()).slice(-2)
      + ':' + ('00' + f.getSeconds()).slice(-2);
    this.ayuda.fechaRegistro = fecha;
    this.ayuda.ubicacion.id = 0;
  }

  registroAyuda() {
    this._constantes.isLoading = true;
    this.ayuda.origenAyuda = this._constantes.origen_ayudar;
    this.ayuda.direccion = this._constantes.direccion;
    if (this._constantes.latitud) {
      this.ayuda.ubicacion.latitude = this._constantes.latitud;
    }
    if (this._constantes.longitud) {
      this.ayuda.ubicacion.longitude = this._constantes.longitud;
    }
    this._servicio.guardarAyudaCiudadano(this.ayuda).subscribe(
      (data) => {
        this._constantes.isLoading = false;
        Swal.fire(
          '!Completado!',
          'Tu ayuda fue registrada con exito.',
          'success'
        );
        this.ayuda = new Ayuda();
        this.inicializaVariables();
        this.actualizaMapa.emit();
        $('#ayudaCiudadanoModal').modal('hide');
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
