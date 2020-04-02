import { Component, OnInit, ViewChild } from '@angular/core';
import { ConstantsService } from './componentes/global/constants.service';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ServiciosService } from './componentes/servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('mapaComponent', { static: false }) mapaComponent: MapaComponent;
  title = 'covid19';
  tipo_ayuda = 'AMBOS';
  soporta_geolocacion = false;
  tipoAyuda: any;
  lista_provincias: any;

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

}
