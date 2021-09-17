import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComboCuidadorPageRoutingModule } from './combo-cuidador-routing.module';

import { ComboCuidadorPage } from './combo-cuidador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComboCuidadorPageRoutingModule
  ],
  declarations: [ComboCuidadorPage]
})
export class ComboCuidadorPageModule {}
