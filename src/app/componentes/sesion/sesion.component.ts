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
  roles: string[];

  constructor(
    private globales: GlobalsComponent,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.isSesionActive = this._authService.isLoggedIn();
    this.name = this._authService.getNameAlreadyLoggedIn();
    this.roles = this._authService.getRolesAlreadyLoggedIn();
    this._authService.isLoggedInObservable().subscribe((isLoggedIn) => {
      this.isSesionActive = isLoggedIn;
      this.name = this._authService.getNameAlreadyLoggedIn();
      this.roles = this._authService.getRolesAlreadyLoggedIn();
    });
  }

  logout() {
    this._authService.logout();
    window.location.reload();
  }

  openModal(tipo: string) {
    $('#' + tipo).modal('show');
  }

}
