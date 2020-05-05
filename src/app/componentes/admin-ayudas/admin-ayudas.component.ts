import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ServiciosService } from '../servicios.service';
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
  dtTrigger: Subject<Object> = new Subject<Object>();

  constructor(
    private _servicio: ServiciosService
  ) { }

  ngOnInit(): void {
    console.log("asdasdasdasdasd");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
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
}
