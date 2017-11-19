import { Storage } from '@ionic/storage';
import { Encuesta } from './../../providers/encuesta/encuesta';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SeleccionarGradoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "SeleccionarGradoPage"
})
@Component({
  selector: 'page-seleccionar-grado',
  templateUrl: 'seleccionar-grado.html',
})
export class SeleccionarGradoPage {
  public ambito = this.navParams.get('ambito');
  public subAmbito = this.navParams.get('subAmbito');

  constructor(public navCtrl: NavController, public navParams: NavParams, public encuesta: Encuesta) {
  }

  public grado;
  public nivel;

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionarGradoPage');
  }

  siguientePagina(gradoElegido, nivelElegido) {
    let cuerpoEncuesta = JSON.stringify({
      idUser:"",
      municipio: "",
      ambito: "",
      subAmbito: "",
      grado: "",
      nivel: ""
    })
    this.encuesta
    .crearEncuesta(cuerpoEncuesta)
    .subscribe(resp =>{
    if()
    })
   
   
   
   
   
   
   
   
   
   
   
   
   
    this.encuesta
      .crearEncuesta("")
      .subscribe((resp) => {

      })
    //primero mostrar mensaje de que se hizo correctamente la encuesta parcial
    // redirigirlo a la pagina del municipio

  }
  /*
    this.navCtrl.push("SeleccionarGradoPage", {
        grado : gradoElegido,
        nivel: nivelElegido
      })
  
  */
}
