import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisContratosPage } from './mis-contratos.page';

const routes: Routes = [
  {
    path: '',
    component: MisContratosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisContratosPageRoutingModule {}
