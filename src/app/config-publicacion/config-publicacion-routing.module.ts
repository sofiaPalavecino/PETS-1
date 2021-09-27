import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPublicacionPage } from './config-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPublicacionPageRoutingModule {}
