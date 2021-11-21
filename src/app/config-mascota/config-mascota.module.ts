import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigMascotaPageRoutingModule } from './config-mascota-routing.module';

import { ConfigMascotaPage } from './config-mascota.page';
import { SanitizerPipe } from '../sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigMascotaPageRoutingModule
  ],
  declarations: [ConfigMascotaPage,SanitizerPipe]
})
export class ConfigMascotaPageModule {}
