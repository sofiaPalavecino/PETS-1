import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisContratosPageRoutingModule } from './mis-contratos-routing.module';

import { MisContratosPage } from './mis-contratos.page';
import { ContratoCardComponent } from '../contrato-card/contrato-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisContratosPageRoutingModule
  ],
  declarations: [MisContratosPage, ContratoCardComponent]
})
export class MisContratosPageModule {}
