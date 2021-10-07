import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisorganizacionesPageRoutingModule } from './misorganizaciones-routing.module';

import { MisorganizacionesPage } from './misorganizaciones.page';
import { OrgaCardComponent } from '../components/orga-card/orga-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisorganizacionesPageRoutingModule
  ],
  declarations: [MisorganizacionesPage,OrgaCardComponent]
})
export class MisorganizacionesPageModule {}
