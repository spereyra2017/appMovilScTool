import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionarAmbitoPage } from './seleccionar-ambito';

@NgModule({
  declarations: [
    SeleccionarAmbitoPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionarAmbitoPage),
  ],
  exports: [
    SeleccionarAmbitoPage
  ]
})
export class SeleccionarAmbitoPageModule { }
