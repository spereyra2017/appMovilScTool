import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionarGradoPage } from './seleccionar-grado';

@NgModule({
  declarations: [
    SeleccionarGradoPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionarGradoPage),
  ],
  exports: [
    SeleccionarGradoPage
  ]
})
export class SeleccionarGradoPageModule { }
