import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsService } from './../global/constants.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Ayuda, Ciudadano, Ubicacion, TipoAyuda, Contacto } from 'src/app/entidades';
import { ServiciosService } from '../servicios.service';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
declare var $: any;
@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  @Input() tipoAyuda: any;
  @Input() provincias: any;
  @Output() actualizaMapa = new EventEmitter();
  public lista_municipios: any;
  public ayuda = new Ayuda();
  public formulario = new FormGroup({
    nombre: new FormControl(this.globales.usuario.fullname, Validators.required),
    descripcion: new FormControl(this.ayuda.descripcion, Validators.required),
    direccion: new FormControl(''),
    estado: new FormControl(''),
    codigo_postal: new FormControl(''),
    tipo_ayuda: new FormControl('', Validators.required),
    colonia: new FormControl(''),
    municipio: new FormControl(''),
    numero_exterior: new FormControl(''),
    numero_interior: new FormControl('',)
  });

  constructor(
    private _servicio: ServiciosService,
    public globales: GlobalsComponent,
    public _constantes: ConstantsService
  ) {
    this.inicializaVariables();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((objPosition) => {
        this.ayuda.ubicacion.latitude = objPosition.coords.latitude;
        this.ayuda.ubicacion.longitude = objPosition.coords.longitude;
      }, (objPositionError) => {
        switch (objPositionError.code) {
          case objPositionError.PERMISSION_DENIED:
            Swal.fire({
              title: 'Error!',
              text: 'No se ha permitido el acceso a la posición del usuario.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
            break;
          case objPositionError.POSITION_UNAVAILABLE:
            Swal.fire({
              title: 'Error!',
              text: 'No se ha podido acceder a la información de su posición.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
            break;
          case objPositionError.TIMEOUT:
            Swal.fire({
              title: 'Error!',
              text: 'El servicio ha tardado demasiado tiempo en responder.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
            break;
          default:
            Swal.fire({
              title: 'Error!',
              text: 'Ocurrio un error desconocido.',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
        }
      }, {
        maximumAge: 75000,
        timeout: 15000
      });

    }
  }

  ngOnInit() {
    if ( localStorage.getItem('loggedUser') ) {
      this.globales.usuario = JSON.parse(localStorage.getItem('loggedUser'));
    }
  }


  enviarAyuda() {
    if (this._constantes.latitud) {
      this.ayuda.ubicacion.latitude = this._constantes.latitud;
    }
    if (this._constantes.longitud) {
      this.ayuda.ubicacion.longitude = this._constantes.longitud;
    }
    this._constantes.isLoading = true;
    this.ayuda.origenAyuda = this._constantes.origen_ayudar;
    this.ayuda.direccion = this._constantes.direccion;
    console.log(this.ayuda);
    this._servicio.guardarAyuda(this.ayuda).subscribe(
      (data) => {
        this._constantes.isLoading = false;
        console.log(data);
        Swal.fire(
          '!Completado!',
          'Tu registro fue registrado con exito.',
          'success'
        );
        this.ayuda = new Ayuda();
        this.inicializaVariables();
        this.actualizaMapa.emit();
        $('#ayudaModal').modal('hide');
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

  cargaMunicipios(municipio) {
    this.ayuda.ubicacion.estado = this.provincias.filter(x => x.id === Number(municipio.target.value))[0].name;
    this._servicio.getMunicipios(municipio.target.value).subscribe(
      (data) => {
        this.lista_municipios = data;
      },
      (error) => {

      }
    );
  }

  actualizaTipoAyuda(event) {
    this.ayuda.tipoAyuda.nombre = this.tipoAyuda.filter(x => x.id === Number(event.target.value))[0].nombre;
  }

  actualizaMunicipio(event) {
    this.ayuda.ubicacion.municipio = this.lista_municipios.filter(x => x.id === Number(event.target.value))[0].fullname;
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

}

