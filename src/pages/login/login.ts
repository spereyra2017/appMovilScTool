import { StatusBar } from '@ionic-native/status-bar';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
import { User } from '../../providers/providers';

class formData {
  constructor() { }
  public USERNAME: any;
  public PASSWORD: any;
}
@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  private loginErrorString: string;
  public email;
  public password;
  loginForm: FormGroup;
  errorMessage: string = null;


  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private fb: FormBuilder) {
     
  



    //  this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //  this.loginErrorString = value;
    // })
  }



 
  // Attempt to login in through our User service
  doLogin(email,password) {

    let usuarioAuxiliar ;
    usuarioAuxiliar = {
      "email":email, 
      "password":password
    };
     console.log("Usuario auxiliar es: "+ usuarioAuxiliar);
      this.user.login(usuarioAuxiliar).subscribe((resp) => {
        console.log("Response es: " + resp.toString);
        const usuario = JSON.stringify(resp);
        console.log("responseAsString is : " + usuario);
        const usuarioJSON = JSON.parse(usuario, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        });

        console.log("El obj es: " + typeof usuarioJSON + "usuarioJSN: " + usuarioJSON.response);
        let toast : any;

        if (usuarioJSON.response == "LOGIN CORRECTO") {

          this.navCtrl.push("SeleccionarMunicipioPage");
        } else {
          toast = this.toastCtrl.create({
            message: "Credenciales incorrectas",
            duration: 3000,
            position: 'top'
          });
          toast.present();

          console.log("Credenciales incorrectas");
        }
      }, (err) => {
        console.log("Erro es: " + err);
         
      });
   
  }
}
