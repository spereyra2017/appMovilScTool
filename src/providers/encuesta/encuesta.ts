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
    let seq = this.api.getGrado('all').share();
    seq.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  selectAmbito() {
    let seq = this.api.getAmbito('all').share();
    seq.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  actualizarEncuesta(infoEncuesta: any) {

    let seq = this.api.addSurveyFirst('addSurvey', infoEncuesta).share();
    seq.subscribe((res: any) => {
      if (res) {
        console.log("Encuesta actualizada.");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  crearEncuesta(infoEncuesta: any) {

    let seq = this.api.addSurveyFirst('add', infoEncuesta).share();
    seq.subscribe((res: any) => {
      console.log("se creo una encuesta");
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  getAllSurveys() {

    let todasLasEncuestas = this.api.getAllSurveys('all').share();

    todasLasEncuestas.subscribe((res: any) => {

    });
    return todasLasEncuestas;
  }
  getTypeLevelBySubAmbiId(idSubambito: any) {

    console.log("El id subambi es: " + idSubambito);
    let subAmbitoTypeLevel = this.api.getTypeLevelBySubambito('getSubAmbitosTypeLevel?id=', idSubambito).share();

    subAmbitoTypeLevel.subscribe((res: any) => {

    });
    return subAmbitoTypeLevel;
  }
  getTypeLevels() {

    let allTypeLevels = this.api.getTypeLevels('all').share();
    allTypeLevels.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return allTypeLevels;
  }

  getAllLevels() {
    let allLevels = this.api.getAllLevels('all').share();
    allLevels.subscribe((res: any) => {

    }, err => {
      console.error('ERROR', err);
    });
    return allLevels;
  }
}
