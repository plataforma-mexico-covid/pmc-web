import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ServiciosService } from '../servicios.service';
import { Ayuda } from 'src/app/entidades';

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this._servicio.adminAyuda().subscribe(
      (data: any[]) => {
        this.ayudas = data;
        this.dtTrigger.next();
      },
      (error) => {

      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
