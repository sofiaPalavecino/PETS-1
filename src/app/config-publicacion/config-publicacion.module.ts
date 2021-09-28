import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPublicacionPageRoutingModule } from './config-publicacion-routing.module';

import { ConfigPublicacionPage } from './config-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPublicacionPageRoutingModule
  ],
  declarations: [ConfigPublicacionPage]
})
export class ConfigPublicacionPageModule {}
