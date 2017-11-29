import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  public idSubambito = this.navParams.get('idSubambito');

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public encuesta: Encuesta,
    public alertCtrl: AlertController
  ) {
  }

  public grado;
  public nivel;
  public nivs: [any];
  public gras: [any];

  ionViewDidLoad() {

    console.log("ambito: " + this.ambito + "Subambito: " + this.subAmbito);
    this.encuesta.selectGrado()
      .subscribe(grados => {

        const userStr = JSON.stringify(grados);
        const items = JSON.parse(userStr, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        
        this.gras = items;
        console.log("Los grados del subambito son: " );
        this.gras.forEach(element => {
          
          console.log(element.name);
        });
       
      });
  }
  getDegreesByTypeLevelId()
  {
    let idTypeLevel
    //obtener id tipo level
    this.encuesta.getTypeLevelBySubAmbiId(this.idSubambito)
    .subscribe(level => {
      let idTypeLevelString = JSON.stringify(level);
      
      idTypeLevel =  JSON.parse(idTypeLevelString, (key, value) => {
        if (typeof value === 'string') {
          return value.toUpperCase();
        }
        return value;
      });

    });
    console.log("El typeLevel es: " + typeof idTypeLevel + " del subambito "+this.idSubambito);

  } 

  

  siguientePagina(gradoElegido, nivelElegido) {
    this.getDegreesByTypeLevelId()

    var mensajeCreado = this.alertCtrl.create({
      title: "Encuesta realizada",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            //  this.navCtrl.push("SeleccionarMunicipioPage")
          }
        }
      ]
    });
    mensajeCreado.present()
    /* let cuerpoEncuesta = JSON.stringify({
       idUser: "",
       municipio: "",
       ambito: "",
       subAmbito: "",
       grado: "",
       nivel: ""
     })
     this.encuesta
       .crearEncuesta(cuerpoEncuesta)
       .subscribe(resp => {
         //verificar que el response devuelva un estado para poder hacer la condicion.
 
         var mensajeCreado = this.alertCtrl.create({
           title: "Encuesta realizada",
           buttons: [
             {
               text: 'Aceptar',
               handler: () => {
                 this.navCtrl.push("SeleccionarMunicipioPage")
               }
             }
           ]
         });
         mensajeCreado.present()
       });*/
    //si entra aca, primero mostrar mensaje ALERT y luego redireccion pagina a municipio.
  }




  gradoElegido($event) {
    console.log($event);
  }

}
