import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPublicacionPageRoutingModule } from './config-publicacion-routing.module';

import { ConfigPublicacionPage } from './config-publicacion.page';
import { SanitizerPipe } from '../sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPublicacionPageRoutingModule
  ],
  declarations: [ConfigPublicacionPage,SanitizerPipe]
})
export class ConfigPublicacionPageModule {}
