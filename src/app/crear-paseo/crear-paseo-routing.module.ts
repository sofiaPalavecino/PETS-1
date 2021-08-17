import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPaseoPage } from './crear-paseo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPaseoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPaseoPageRoutingModule {}
