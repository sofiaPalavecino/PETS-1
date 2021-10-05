import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizacionesPage } from './organizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizacionesPageRoutingModule {}
