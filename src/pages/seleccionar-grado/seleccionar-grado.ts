import { Encuesta } from './../../providers/encuesta/encuesta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { User } from '../../providers/providers';

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
  public municipio = this.navParams.get('municipio');
  public credenciales = this.navParams.get('credenciales');

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public encuesta: Encuesta,
    public alertCtrl: AlertController,
    public user: User

  ) {
  }

  public grado;
  public nivel;
  public nivs: [any];
  public gras: [any];
  public degreesByTypeLevel: [any];
  public nivs2: any[] = [];
  public idUsuario
  public idMunicipio
  public survey;

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
    this.obtenerIdUsuario()
    this.obtenerIdMunicipalidad()
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
            this.nivs2.push(element.name)// capaz que esta mal la sintaxis del push o algo de eso,creo que es el html
          }
        });
      });
  }
  obtenerIdMunicipalidad() {
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
        let arreglo: [any];
        arreglo = items;
        arreglo.forEach(element => {
          if (this.municipio == element.name) {
            this.idMunicipio = element.id
            console.log(element.id + "  " + this.idMunicipio)

          }
        });
      })
  }
  obtenerIdUsuario() {
    let aux = this.credenciales

    this.user.obtenerIdUsuario(aux).subscribe((resp) => {
      const usuario = JSON.stringify(resp);
      const usuarioJSON = JSON.parse(usuario, (key, value) => {
        if (typeof value === 'string') {
          return value.toUpperCase();
        }
        return value;
      });
      console.log(usuarioJSON.id)
      this.idUsuario = usuarioJSON.id
    });
  }
  siguientePagina(gradoElegido, nivelElegido) {
    //var CurrentDate = moment().toISOString();
    console.log("User id = " + this.idUsuario);
    let userr = {
      "userId": this.idUsuario,//id usuario
      "municipalityId": this.idMunicipio //id municipalidad.
    }
    console.log("Userr  = " + userr);
    /*string jsonString = ""municipalityId": 4 ,
    "userId": 1";
       "state": "activa",
        "userId": 0,
        "municipalityId": 1*/
    
    let cuerpoEncuesta = JSON.stringify({
      id: 1,
      initialdate: 1513298411000,
      finaldate: 1513298411000,
      state: "activa",
      userId: 1,
      municipalityId: 4
    })
    const userJSON = JSON.parse(cuerpoEncuesta, (key, value) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    });
    console.log("json ::::"+userJSON)
    //this.idUsuario,this.idMunicipio,
    this.encuesta
      .crearEncuesta(userJSON)
      .subscribe(resp => {
      console.log(resp)
      })

    var mensajeCreado = this.alertCtrl.create({
      title: "Encuesta realizada",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log("Obj encuesta: " + this.encuesta);
            this.navCtrl.push("SeleccionarMunicipioPage")
          }
        }
      ]
    });
    mensajeCreado.present()
 
  }
  siguientePaginaCrearEncuesta(gradoElegido, nivelElegido) {
    //var CurrentDate = moment().toISOString();
    console.log("User id = " + this.idUsuario);
    let userr = {
      "userId": this.idUsuario,//id usuario
      "municipalityId": this.idMunicipio //id municipalidad.
    }
    const userStr = JSON.stringify(userr);
    const userJSON = JSON.parse(userStr, (key, value) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    });
    console.log("typeof userJSON: " + typeof userJSON)
    // let now = moment().format("yyyy-mm-dd");// 2017-12-10T20:10:33-03:00
    //console.log(now)
    this.encuesta
      .crearEncuesta(userJSON)
      .subscribe(resp => {
        const u = JSON.stringify(resp);
        const itemsJSON = JSON.parse(u, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        console.log("Crear encuesta tiene " + u);
        console.log("itemsJSON de crear encuesta tiene: " + itemsJSON)
      })

    var mensajeCreado = this.alertCtrl.create({
      title: "Encuesta realizada",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log("Obj encuesta: " + this.encuesta);
            this.navCtrl.push("SeleccionarMunicipioPage")
          }
        }
      ]
    });
    mensajeCreado.present()
    let cuerpoEncuesta = JSON.stringify({
      idUser: "",
      municipio: "",
      ambito: "",
      subAmbito: "",
      grado: "",
      nivel: ""
    })
  }

  siguientePaginaActualizarEncuesta(gradoElegido, nivelElegido) {

    console.log("User id = " + this.idUsuario);
    let userr = {
      "userId": this.idUsuario,//id usuario
      "municipalityId": this.idMunicipio //id municipalidad.
    }
    const userStr = JSON.stringify(userr);
    const userJSON = JSON.parse(userStr, (key, value) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    });
    console.log("typeof userJSON: " + typeof userJSON)
    this.encuesta
      .crearEncuesta(userJSON)
      .subscribe(resp => {
        const u = JSON.stringify(resp);
        const itemsJSON = JSON.parse(u, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });
        console.log("Crear encuesta tiene " + u);
        console.log("itemsJSON de crear encuesta tiene: " + itemsJSON)
      })

    var mensajeCreado = this.alertCtrl.create({
      title: "Encuesta realizada",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log("Obj encuesta: " + this.encuesta);
            this.navCtrl.push("SeleccionarMunicipioPage")
          }
        }
      ]
    });
    mensajeCreado.present()
    let cuerpoEncuesta = JSON.stringify({
      idUser: "",
      municipio: "",
      ambito: "",
      subAmbito: "",
      grado: "",
      nivel: ""
    })
  }



}
