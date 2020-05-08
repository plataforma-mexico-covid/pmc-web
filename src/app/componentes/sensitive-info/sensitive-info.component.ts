import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/data-share.service';
import { ServiciosService } from '../servicios.service';
import { Ayuda, InfoSensible } from 'src/app/entidades';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-sensitive-info',
  templateUrl: './sensitive-info.component.html',
  styleUrls: ['./sensitive-info.component.css']
})
export class SensitiveInfoComponent implements OnInit {

  public ayuda = new Ayuda();
  public infoSensible = new InfoSensible();
  isLoaded: boolean;

  constructor(
    private _dataShare: DataShareService,
    private _servicio: ServiciosService
  ) { }

  ngOnInit() {
    this.isLoaded = false;
    this._dataShare.currentAyuda.subscribe(ayuda => {
      Object.assign(this.ayuda, ayuda);
      this.showSensitiveInfo();
    });
  }

  showSensitiveInfo() {
    if (this.ayuda.id === undefined) return; 
    this._servicio.sensitiveInfoAyuda(this.ayuda.id).subscribe((data: any) => {
      this.infoSensible = data;
      this.isLoaded = true;
    }, error => {
      Swal.fire('!Error¡', 'No se pudo realizar la operación', 'error');
      $('#sensitiveInfoModal').modal('hide');
    });
  }

}
