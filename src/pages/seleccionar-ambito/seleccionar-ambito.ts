import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'SeleccionarAmbitoPage'
})
@Component({
  selector: 'page-seleccionar-ambito',
  templateUrl: 'seleccionar-ambito.html',
})
export class SeleccionarAmbitoPage {
  public municipio = this.navParams.get('municipio');
  public credenciales = this.navParams.get('credenciales');
  public ambito
  public subAmbito
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public encuesta: Encuesta) {
  }

  public ambi = []; //
  public subAmbi = []; // LISTA PARA SABER LOS SUBAMBITOS DEL AMBITO ELEGIDO
  public idAmbito; //AUXILIAR PARA SABER CUAL AMBITO ELIGIO EL USER
  public arreglo: [any]; // LISTA PARA LOS AMBITOS DEL SISTEMA
  public auxiliar;

  ionViewDidLoad() {

    this.encuesta.selectAmbito()
      .subscribe(ambitos => {
        const userStr = JSON.stringify(ambitos);
        const items = JSON.parse(userStr, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        this.arreglo = items; // GUARDO LOS AMBITOS DEL SISTEMA 
        this.arreglo.forEach(element => { // RECORRO LOS AMBITOS 
          this.ambi.push(element); // GUARDO EL NOMBRE DE CADA AMBITO EN UN ARRAY
        });
      });
  }
  siguientePagina(ambito, subAmbito) {
    let idSub = this.getSubambitoById();
    this.navCtrl.push("SeleccionarGradoPage", {
      ambito: this.ambito,
      subAmbito: this.subAmbito,
      idSubambito: idSub,
      municipio: this.municipio,
      credenciales: this.credenciales
    })
  }
  getSubambitoById() {
    this.subAmbi.forEach(sub => {
      if (sub.name == this.subAmbito) {
        this.auxiliar = sub.id;
      }
    });
    return this.auxiliar;
  }
  ambitoElegido($ambi) {
    this.arreglo.forEach(element => {
      if (element.name == this.ambito) {
        this.idAmbito = element.id;
        this.subAmbi = element.subAmbitos;
      }
    });
  }
}
