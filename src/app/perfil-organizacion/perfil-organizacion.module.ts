import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOrganizacionPageRoutingModule } from './perfil-organizacion-routing.module';

import { PerfilOrganizacionPage } from './perfil-organizacion.page';

import { MascotaCardComponent } from "../components/mascota-card/mascota-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOrganizacionPageRoutingModule
  ],
  declarations: [PerfilOrganizacionPage,MascotaCardComponent]
})
export class PerfilOrganizacionPageModule {}
