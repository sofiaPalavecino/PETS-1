import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanCuidadoPage } from './plan-cuidado.page';

const routes: Routes = [
  {
    path: '',
    component: PlanCuidadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanCuidadoPageRoutingModule {}
