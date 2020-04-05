import { GlobalsComponent } from './../global/global.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $: any;
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  isSesionActive: any;
  name: string;

  constructor(
    private globales: GlobalsComponent,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.isSesionActive = this._authService.isLoggedIn();
    this.name = this._authService.getNameAlreadyLoggedIn();
    this._authService.isLoggedInObservable().subscribe((isLoggedIn) => {this.isSesionActive = isLoggedIn});
  }

  logout() {
    this._authService.logout();
  }

  openModal(tipo: string) {
    $('#' + tipo).modal('show');
  }

}
