import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOrganizacionPageRoutingModule } from './perfil-organizacion-routing.module';

import { PerfilOrganizacionPage } from './perfil-organizacion.page';

import { MascotaCardComponent } from "../components/mascota-card/mascota-card.component";

import { PubliCardComponent } from "../components/publi-card/publi-card.component";
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import { PopoverAddAdministradoresComponent } from '../components/popover-add-administradores/popover-add-administradores.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOrganizacionPageRoutingModule,
  ],
  declarations: [PerfilOrganizacionPage,MascotaCardComponent,PubliCardComponent,PopoverAddAdministradoresComponent],
  providers: [PopoverAddAdministradoresComponent],
})
export class PerfilOrganizacionPageModule {}
