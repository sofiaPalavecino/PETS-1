import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizacionesPageRoutingModule } from './organizaciones-routing.module';

import { OrganizacionesPage } from './organizaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizacionesPageRoutingModule
  ],
  declarations: [OrganizacionesPage]
})
export class OrganizacionesPageModule {}
