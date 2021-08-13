import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';

import { PerfilUsuarioPage } from './perfil-usuario.page';

import { DirectivesModule } from '../directives/directives.module';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';

@NgModule({
  declarations: [PerfilUsuarioPage,PopoverPerfilComponent],
  providers: [PopoverPerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioPageRoutingModule,
    DirectivesModule
  ],
})
export class PerfilUsuarioPageModule {}
