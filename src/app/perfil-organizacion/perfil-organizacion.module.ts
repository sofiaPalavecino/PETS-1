import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOrganizacionPageRoutingModule } from './perfil-organizacion-routing.module';

import { PerfilOrganizacionPage } from './perfil-organizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOrganizacionPageRoutingModule
  ],
  declarations: [PerfilOrganizacionPage]
})
export class PerfilOrganizacionPageModule {}
