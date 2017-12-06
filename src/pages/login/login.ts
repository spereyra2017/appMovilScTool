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
  public email: AbstractControl;
  public password: AbstractControl;
  loginForm: FormGroup;
  errorMessage: string = null;
  public usuario = new formData();

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private fb: FormBuilder) {

    this.loginForm = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });


    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
    //  this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //  this.loginErrorString = value;
    // })
  }



  public setDataForm(): void {
    this.usuario.USERNAME = this.loginForm.value.email;
    this.usuario.PASSWORD = this.loginForm.value.password;
  }
  // Attempt to login in through our User service
  doLogin() {
    this.setDataForm();
    this.user.login(this.usuario).subscribe((resp) => {
      console.log("Response es: " + resp.toString);
      const usuario = JSON.stringify(resp);
      console.log("responseAsString is : " + usuario);
      const usuarioJSON = JSON.parse(usuario, (key, value) => {
        if (typeof value === 'string') {
          return value.toUpperCase();
        }
        return value;
      });

      console.log("El obj es: "  + typeof usuarioJSON + "usuarioJSN: " + usuarioJSON.response);
        if (usuarioJSON.response ==  "LOGIN CORRECTO") {
               
          this.navCtrl.push("SeleccionarMunicipioPage");
        }else
      {
        console.log("Credenciales incorrectas");
      }
    }, (err) => {
      console.log("Erro es: "+err);
      let toast = this.toastCtrl.create({
        message: err + "error !",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
