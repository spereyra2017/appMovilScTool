import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Encuesta {
  _user: any;

  constructor(public api: Api) { }


  
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
