import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiciosService } from '../servicios.service';
import { DataShareService } from '../../services/data-share.service';
import { Ayuda } from 'src/app/entidades';

declare var $: any;
@Component({
  selector: 'app-admin-ayudas',
  templateUrl: './admin-ayudas.component.html',
  styleUrls: ['./admin-ayudas.component.css']
})
export class AdminAyudasComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  ayudas: Ayuda[] = [];
  ayuda_id: number;
  dtTrigger: Subject<Object> = new Subject<Object>();

  constructor(
    private _servicio: ServiciosService,
    private _dataShare: DataShareService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._servicio.adminAyuda(dataTablesParameters)
        .subscribe(
          (resp: any) => {
            this.ayudas = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
            //this.dtTrigger.next();
          },
          (error) => {
            console.log("ERROR: " + error);
          }
        );
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  finalizarAyuda(ayuda_id?) {
    this.ayuda_id = ayuda_id ? ayuda_id : this.ayuda_id;
    Swal.fire({
      title: '¿Quieres finalizar esta ayuda?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._servicio.finalizarAyuda(this.ayuda_id).subscribe((data: any) => {
          Swal.fire('¡Exito!', 'Se finalizo la ayuda correctamente.', 'success');
        }, error => {
          Swal.fire('!Error¡', 'No se pudo realizar la operación', 'error');
        });
      }
    });
  }

  updateAyuda(ayuda) {
    this._dataShare.changeAyuda(ayuda);
    $('#ayudaUpdateModal').modal('show');
  }
}
