import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanCuidadoPageRoutingModule } from './plan-cuidado-routing.module';

import { PlanCuidadoPage } from './plan-cuidado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanCuidadoPageRoutingModule
  ],
  declarations: [PlanCuidadoPage]
})
export class PlanCuidadoPageModule {}
