import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPaseoPageRoutingModule } from './crear-paseo-routing.module';

import { CrearPaseoPage } from './crear-paseo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPaseoPageRoutingModule
  ],
  declarations: [CrearPaseoPage]
})
export class CrearPaseoPageModule {}
