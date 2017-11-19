import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionarMunicipioPage } from './seleccionar-municipio';

@NgModule({
  declarations: [
    SeleccionarMunicipioPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionarMunicipioPage),
  ],
  exports:[
    SeleccionarMunicipioPage
  ]
})
export class SeleccionarMunicipioPageModule {}
