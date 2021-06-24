import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilOrganizacionPage } from './perfil-organizacion.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilOrganizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilOrganizacionPageRoutingModule {}
