import { Http } from '@angular/http';
import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SeleccionarMunicipioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SeleccionarMunicipioPage'
})
@Component({
  selector: 'page-seleccionar-municipio',
  templateUrl: 'seleccionar-municipio.html',
})
export class SeleccionarMunicipioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public encuesta: Encuesta) {

  }
  public Municipio;
  public items;
  public muni= [];


  ionViewDidLoad() {
    this.encuesta.selectMunicipio()
      .subscribe(municipios => {
        // let aux2=JSON.parse(municipios);
        const userStr = JSON.stringify(municipios);
        const items = JSON.parse(userStr, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        console.log(items);
        let arreglo: [any];

        arreglo = items;
        arreglo.forEach(element => {
          this.muni.push( element.name) ;
        });
      })
  }
  siguientePagina() {
    console.log(this.Municipio);
    
    this.navCtrl.push("SeleccionarAmbitoPage", {
      municipio: this.Municipio
    })
  }
}
