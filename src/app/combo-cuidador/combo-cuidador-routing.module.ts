import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComboCuidadorPage } from './combo-cuidador.page';

const routes: Routes = [
  {
    path: '',
    component: ComboCuidadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComboCuidadorPageRoutingModule {}
