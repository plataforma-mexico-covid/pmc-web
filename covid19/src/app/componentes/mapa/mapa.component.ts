import { ConstantsService } from './../global/constants.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Ayuda } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from '../global/global.component';
declare var $: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @Output() setOrigenContactar = new EventEmitter();
  @Input() tipo_ayuda: 'AMBOS' | 'OFRECE' | 'SOLICITA' = 'AMBOS';
  initial_lat: number = 19.421133;
  initial_lng: number = 99.134957;
  zoom: number = 15;
  content = '';
  puntos_marcados = new Array<Ayuda>();
  soporta_geolocacion = false;
  contador_movimiento: any;
  mi_posicion = { longitud: null, latitud: null };
  ayuda_id: number;

  icons = {
    1: '/assets/imgs/comida_50_50.png',
    2: '/assets/imgs/envios_50_50.png',
    3: '/assets/imgs/taxi_50_50.png',
    4: '/assets/imgs/psicologico_50_50.png',
    5: '/assets/imgs/legal_50_50.png',
    6: '/assets/imgs/posicion_50.png',
  }

  constructor(
    private _servicio: ServiciosService,
    private _constantes: ConstantsService,
    private _globales: GlobalsComponent
  ) { }

  ngOnInit() {
    if (navigator.geolocation) {
      this.soporta_geolocacion = true;
      navigator.geolocation.getCurrentPosition((objPosition) => {
        this.initial_lng = objPosition.coords.longitude;
        this.initial_lat = objPosition.coords.latitude;
        this.mi_posicion.latitud = objPosition.coords.latitude;
        this.mi_posicion.longitud = objPosition.coords.longitude;
      }, (objPositionError) => {
        this.soporta_geolocacion = false;
        switch (objPositionError.code) {
          case objPositionError.PERMISSION_DENIED:
            this.content = 'No se ha permitido el acceso a la posición del usuario.';
            break;
          case objPositionError.POSITION_UNAVAILABLE:
            this.content = 'No se ha podido acceder a la información de su posición.';
            break;
          case objPositionError.TIMEOUT:
            this.content = 'El servicio ha tardado demasiado tiempo en responder.';
            break;
          default:
            this.content = 'Error desconocido.';
        }
      }, {
        maximumAge: 75000,
        timeout: 15000
      });
      this.actualizarRegistros(this.initial_lat, this.initial_lng, this.zoom);
    } else {
      alert('No hay soporte para la geolocalización: podemos desistir o utilizar algún método alternativo');
    }
    console.log('WELCOME ' + $('#welcomeModal'));
    $('#welcomeModal').modal('show');
  }

  cambioTipoAyuda(tipo_ayuda) {
    this.tipo_ayuda = tipo_ayuda;
    this.actualizarRegistros(this.initial_lng, this.initial_lat, this.zoom);
  }


  actualizarRegistros(longitud?, latitud?, zoom?) {
    // ayuda
    this._servicio.ayuda(this.tipo_ayuda, longitud ? longitud : this.mi_posicion.longitud, latitud ? latitud : this.mi_posicion.latitud, zoom ? zoom : this.zoom).subscribe(
      (data: any[]) => {
        this.puntos_marcados = data;
        this._constantes.puntos_marcados.length = 0;
        this._constantes.puntos_marcados = this.puntos_marcados;
      },
      (error) => {

      }
    );

  }

  clickedMarker(ayuda: any) {
  }

  markerDragEnd(dato1, dato2) {

  }

  mapClicked(posicion: any) {
    console.log(this.mi_posicion);

    Swal.fire({
      title: '¿Quieres indicar este punto como origen para  Solicitar/Ofrecer ayuda?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.mi_posicion.longitud = posicion.coords.lng;
        this.mi_posicion.latitud = posicion.coords.lat;
      }
    });
    this._constantes.latitud = posicion.coords.lat;
    this._constantes.longitud = posicion.coords.lng;
    // console.log(posicion.coords.lat, posicion.coords.lng);
  }

  cambioZoom(zoom) {
    this.zoom = zoom;
  }

  cambioPosicion(posicion, mapa) {
    if (this.contador_movimiento) {
      clearTimeout(this.contador_movimiento);
    }
    this.contador_movimiento = setTimeout(() => {
      this.actualizarRegistros(posicion.lng, posicion.lat, this.zoom);
      this.initial_lat = posicion.lat;
      this.initial_lng = posicion.lng;
      this.contador_movimiento = null;
    }, 500);
  }

  contactarUsuario(ayuda_id?) {
    this.ayuda_id = ayuda_id ? ayuda_id : this.ayuda_id;
    if (this._globales.usuario.token) {
      Swal.fire({
        title: '¿Quieres contactar con este usuario?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this._servicio.contactarAyuda(this.ayuda_id, this._globales.usuario.username).subscribe((data: any) => {
            Swal.fire('¡Exito!', 'Se han enviado los datos del usuario al correo proporcionado en el registro.', 'success');
            this.actualizarRegistros();
          }, error => {
            Swal.fire('!Error¡', 'No se pudo realizar la operación', 'error');
          });
        }
      });

    } else {
      this.setOrigenContactar.emit(true);
      $('#exampleModal').modal('show');
    }
  }

}
