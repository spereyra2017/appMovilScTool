import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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
  public degreesByTypeLevel: [any];
  public nivs2: any[] = [];;

  ionViewDidLoad() {

    // console.log("ambito: " + this.ambito + "Subambito: " + this.subAmbito);
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
        this.gras.forEach(element => {
          //
        });

      });
  }

  gradoElegido($event) {
    //let gradoAux = $event hay que cargar aca el array de levelsCompletos?,si ya esta echo,
    this.getDegreesByTypeLevelId()

    console.log($event);
  }

  getDegreesByTypeLevelId() {
    let idTypeLevel
    let auxTypeId;
    //obtener id tipo level
    this.encuesta.getTypeLevelBySubAmbiId(this.idSubambito)
      .subscribe(typeLevel => {

        const idTypeLevelString = JSON.stringify(typeLevel);
        const oneLevel = JSON.parse(idTypeLevelString, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        auxTypeId = Number(oneLevel.id);
      });
    this.encuesta.getAllLevels()
      .subscribe(levelAux => {

        const levelString = JSON.stringify(levelAux);
        const allLevels = JSON.parse(levelString, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });

        this.nivs = allLevels;// no es nivs2 ?si hago eso, se rompe todo, quizas es la forma en la que copias un array a otro?mira
        this.nivs.forEach(element => {
          //console.log("element de nivel es: " + element.degreeId + " ");
          if (element.degreeId == auxTypeId) {
            console.log( element.name )
            this.nivs2.push(element.name)// capaz que esta mal la sintaxis del push o algo de eso,creo que es el html
            console.log(this.nivs2)
          }
        });
      });      
  }



  siguientePagina(gradoElegido, nivelElegido) {
    console.log(gradoElegido + "//" + nivelElegido)

    var mensajeCreado = this.alertCtrl.create({
      title: "Encuesta realizada",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // this.navCtrl.push("SeleccionarMunicipioPage")
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



}
