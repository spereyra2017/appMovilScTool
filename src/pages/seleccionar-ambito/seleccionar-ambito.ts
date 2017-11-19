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
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
  }
  siguientePagina(ambito, subAmbito) {
    this.navCtrl.push("SeleccionarGradoPage", {
      ambito: this.ambito,
      subAmbito: this.subAmbito
    })

  }
}
