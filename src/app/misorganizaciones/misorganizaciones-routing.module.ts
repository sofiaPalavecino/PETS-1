import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisorganizacionesPage } from './misorganizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisorganizacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisorganizacionesPageRoutingModule {}
