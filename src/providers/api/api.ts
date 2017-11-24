import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://192.168.100.189:8080/rest';

  constructor(public http: HttpClient) {  
  }
  /*
  getGrado(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/municipalities/' + endpoint, reqOpts);
  }
  getAmbito(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/municipalities/' + endpoint, reqOpts);
  }*/
  getMunicipio(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/municipalities/' + endpoint, reqOpts);
  }
  get(endpoint: string, params?: any, reqOpts?: any) {

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
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
