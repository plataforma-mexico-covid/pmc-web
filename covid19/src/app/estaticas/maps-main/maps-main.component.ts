import { Component, OnInit, ViewChild } from '@angular/core';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { ConstantsService } from 'src/app/componentes/global/constants.service';
import { ServiciosService } from 'src/app/componentes/servicios.service';

@Component({
  selector: 'app-maps-main',
  templateUrl: './maps-main.component.html',
  styleUrls: ['./maps-main.component.css']
})
export class MapsMainComponent implements OnInit {
  @ViewChild('mapaComponent', { static: false }) mapaComponent: MapaComponent;
  title = 'covid19';
  tipo_ayuda = 'AMBOS';
  soporta_geolocacion = false;
  tipoAyuda: any;
  lista_provincias: any;
  origen_contactar = false;


  constructor(
    public constantes: ConstantsService,
    private _servicio: ServiciosService
  ) {
    this.constantes.isLoading = false;
  }

  ngOnInit() {
    if (navigator.geolocation) {
      this.soporta_geolocacion = true;
    }
  }
  actualizarTipoAyuda(tipo_ayuda) {
    this.mapaComponent.cambioTipoAyuda(tipo_ayuda);
  }

  actualizaPosicion() {
    this.mapaComponent.actualizarRegistros();
  }

  getTiposAyuda() {
    this._servicio.getTiposAyuda().subscribe(
      (data) => {
        console.log(data);
        this.getProvincias();
        this.tipoAyuda = data;
      },
      (error) => {

      }
    );
  }

  getProvincias() {
    this._servicio.getProvincias().subscribe(
      (data) => {
        console.log(data);
        this.lista_provincias = data;
      },
      (error) => {

      }
    );
  }

  setOrigenContactar(contactar) {
    this.origen_contactar = contactar;
  }

  loginCorrecto() {
    this.mapaComponent.contactarUsuario();
  }
}
