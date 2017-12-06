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
  public nivelesCompletos :[any];

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
        console.log("Los grados del subambito son: " );
        this.gras.forEach(element => {
          
          console.log(element.name);
        });
       
      });
  }
  getDegreesByTypeLevelId()
  {
    let idTypeLevel
    let auxTypeId ;
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

      console.log("El valor de level atributo es: "+oneLevel + " " + typeof oneLevel);
       auxTypeId = Number(oneLevel.id);
      console.log("Ahora siendo int es: " + auxTypeId); 
    });


    /*this.encuesta.getTypeLevels()
    .subscribe(auxTypeLevel => {
      
      let auxTypeLevelString = JSON.stringify(auxTypeLevel);
      auxTypeLevelString = JSON.parse(auxTypeLevelString, (key,value) => {
        if (typeof value === 'string') {
          return value.toUpperCase();
        }
        return value;
      });
    });
*/

    this.encuesta.getAllLevels()
    .subscribe(levelAux => {

      const levelString = JSON.stringify(levelAux);
      const allLevels = JSON.parse(levelString, (key, value) => {
        if (typeof value === 'string') {
          return value.toUpperCase();
        }
        return value;
      });
      
      this.nivs = allLevels;
      console.log("Que es allLevels?? : " +allLevels );
      this.nivs.forEach(element => {
        console.log("element de nivel es: " +element.degreeId + " "+typeof element.degreeId +" " );
      
        console.log("auxTypeId es: " +auxTypeId + typeof auxTypeId);

        if (element.degreeId == auxTypeId) {
          console.log("Element.degree es igual al degree elegido: " +element);
        //  this.nivelesCompletos.push(element); //aca me trae una lista de objs niveles
        }
      });
//      console.log(element);
      console.log("La lista de niveles es: " + this.nivelesCompletos);
    });

  } 

  

  siguientePagina(gradoElegido, nivelElegido) {
    this.getDegreesByTypeLevelId()

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
