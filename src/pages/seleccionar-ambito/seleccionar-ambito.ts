import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeleccionarAmbitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SeleccionarAmbitoPage'
})
@Component({
  selector: 'page-seleccionar-ambito',
  templateUrl: 'seleccionar-ambito.html',
})
export class SeleccionarAmbitoPage {
  public municipio = this.navParams.get('municipio');
  public ambito
  public subAmbito
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public encuesta: Encuesta) {
  }

  public ambi = []; //
  public subAmbi = []; // LISTA PARA SABER LOS SUBAMBITOS DEL AMBITO ELEGIDO
  public idAmbito; //AUXILIAR PARA SABER CUAL AMBITO ELIGIO EL USER
  public arreglo: [any]; // LISTA PARA LOS AMBITOS DEL SISTEMA

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
        //console.log(items);
       

        this.arreglo = items; // GUARDO LOS AMBITOS DEL SISTEMA
        this.arreglo.forEach(element => { // RECORRO LOS AMBITOS 
          this.ambi.push(element); // GUARDO EL NOMBRE DE CADA AMBITO EN UN ARRAY
        });

        /*this.arreglo.forEach(ambito => {
          ambito.subAmbitos.forEach(subAmbito => { // POR CADA AMBITO RECORRO SUS SUBAMBITOS

            this.arreglo.forEach(ambitoPosta => {

              if (subAmbito.groupId == ambitoPosta.id) {
                console.log(subAmbito.name);
                this.subAmbi.push(subAmbito);
              }
            });

          });

        });*/

      });      

  }
  siguientePagina(ambito, subAmbito) {
    this.navCtrl.push("SeleccionarGradoPage", {
      ambito: this.ambito,
      subAmbito: this.subAmbito
    })

  }

  ambitoElegido($steph){
    console.log($steph)
    this.arreglo.forEach(element => {
      if(element.name == this.ambito){
        this.idAmbito = element.id;
        console.log("El id del ambito elegido es: " + this.idAmbito);   
        this.subAmbi=element.subAmbitos;
        
      } 
    });
  

  }
}
