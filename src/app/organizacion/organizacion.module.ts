import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizacionPageRoutingModule } from './organizacion-routing.module';

import { OrganizacionPage } from './organizacion.page';
import { MascotaCardComponent } from "../components/mascota-card/mascota-card.component";

import { PubliCardComponent } from "../components/publi-card/publi-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizacionPageRoutingModule
  ],
  declarations: [OrganizacionPage,MascotaCardComponent,PubliCardComponent]
})
export class OrganizacionPageModule {}
