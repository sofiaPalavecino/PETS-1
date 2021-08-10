import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigMascotaPage } from './config-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigMascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigMascotaPageRoutingModule {}
