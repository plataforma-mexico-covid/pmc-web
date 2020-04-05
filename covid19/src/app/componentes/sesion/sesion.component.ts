import { GlobalsComponent } from './../global/global.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  isSesionActive: any;

  constructor(
    private globales: GlobalsComponent
  ) { }

  ngOnInit() {
    console.log('USUARIO: ' + this.globales.usuario);
    this.isSesionActive = this.globales.usuario.token ? true : false;
  }

}
