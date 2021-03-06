import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }
  obtenerIdUsuario(usuario: any) {
    
    console.log(usuario)
    let seq = this.api.iniciarSesion('getLoginweb', usuario).share();
    seq.subscribe((res: any) => {
      console.log("Usuario es: " + res);
      if (res != null) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('Credenciales incorrectas', err);
    });

    return seq;
  }
  login(usuario: any) {
    
    console.log(usuario)
    let seq = this.api.iniciarSesion('getLoginApp', usuario).share();
    seq.subscribe((res: any) => {
      if (res != null) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('Credenciales incorrectas', err);
    });

    return seq;
  }

  selectMunicipio() {
    let seq = this.api.getMunicipio('all').share();
    seq.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  
  logout() {
    this._user = null;
  }


  _loggedIn(resp) {
    this._user = resp.user;
  }
}
