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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  public Municipio;
  public Municipios;

  public items;
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SeleccionarMunicipioPage');
  }
  siguientePagina() {

    this.navCtrl.push("SeleccionarAmbitoPage", {
      municipio: this.Municipio
    })
  }
}
