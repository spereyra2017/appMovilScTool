import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:8080/rest';

  constructor(public http: HttpClient) {
  }
  getAllSurveys(endpoint: string, params?: any, reqOpts?: any){
    return this.http.get(this.url + '/surveys/' + endpoint, reqOpts);
  }
  getGrado(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/degrees/' + endpoint, reqOpts);
  }
  getAmbito(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/ambitos/' + endpoint, reqOpts);
  }
  getMunicipio(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/municipalities/' + endpoint, reqOpts);
  }
  getTypeLevelBySubambito(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/subambitostypelevel/' + endpoint + params, reqOpts);
  }
  getTypeLevels(endpoint: string, params?: any, reqOpts?: any) {

    return this.http.get(this.url + '/typesLevels/' + endpoint, reqOpts);
  }
  getAllLevels(endpoint: string, params?: any, reqOpts?: any) {

    return this.http.get(this.url + '/levels/' + endpoint, reqOpts);
  }
  iniciarSesion(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/users/' + endpoint, body, reqOpts);
  }
  addSurveyUpdate(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/surveys/' + endpoint, body, reqOpts);
  }
  addSurveyFirst(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/surveys/' + endpoint, body, reqOpts);
  }
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
