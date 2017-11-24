import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';

@Injectable()
export class Encuesta {
  _user: any;

  constructor(public api: Api) { }

  selectMunicipio() {
    let seq = this.api.getMunicipio('all').share();
    seq
      .subscribe((res: any) => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  selectGrado() {
    /*let seq = this.api.getGrado('').share();
    seq.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return seq;*/
  }
  selectAmbito() {
    let seq = this.api.getAmbito('all').share();
    seq.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  crearEncuesta(infoEncuesta: any) {
    let seq = this.api.get('addSurvey', infoEncuesta).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        //this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
