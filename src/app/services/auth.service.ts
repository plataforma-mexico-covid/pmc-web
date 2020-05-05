import { GlobalsComponent } from './../componentes/global/global.component';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ServiciosService } from '../componentes/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn = false;
  private subject = new Subject<boolean>();
  private observable = this.subject.asObservable();

  constructor(private _servicio: ServiciosService,
              private globales: GlobalsComponent
  ) {
    this.isUserLoggedIn = this.isAlreadyLoggedIn();
  }

  public login(user): Promise<any> {
    // If the user is logged in, send a promise resolvation, otherwise, send the promise of the apiLogin
    if (this.isAlreadyLoggedIn()) {
      return Promise.resolve(this.getAlreadyLoggedIn());
    } else {
      return this.apiLogin(user);
    }
  }

  public logout() {
    localStorage.removeItem('loggedUser');
    this.isUserLoggedIn = false;
    this.subject.next(this.isUserLoggedIn);
  }

  public isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public getNameAlreadyLoggedIn(): string {
    return this.isAlreadyLoggedIn() ? this.getAlreadyLoggedIn().fullname : "";
  }

  public getRolesAlreadyLoggedIn(): string[] {
    return this.isAlreadyLoggedIn() ? this.getAlreadyLoggedIn().roles.map(function(obj) { 
            return obj.authority;
          }) : [];
  }

  public isLoggedInObservable(): Observable<boolean> {
    return this.observable;
  }

  private getAlreadyLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  private isAlreadyLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }

  private apiLogin(usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this._servicio.iniciarSession(usuario)
        .toPromise()
        .then((data: any) => {
          if (data.token) {
            // We should update the localStorage
            localStorage.setItem('loggedUser', JSON.stringify(data));
            this.globales.usuario = data;
            this.isUserLoggedIn = true;
            this.subject.next(this.isUserLoggedIn);
            resolve(data);
          } else {
            // We clear the localStorage value, since the user is not logged in
            localStorage.removeItem('loggedUser');
            this.isUserLoggedIn = false;
            this.subject.next(this.isUserLoggedIn);
            reject('Email Address and Password do not match');
          }
        })
        .catch(error => {
          this.isUserLoggedIn = false;
          reject(error);
        });
    })
  }
}
