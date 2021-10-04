import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule, DatePipe } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
>>>>>>> c920dcfc76c4fa9253b0f9bbb087ea944e35a001
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPageRoutingModule } from './reserva-routing.module';

import { ReservaPage } from './reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageRoutingModule
  ],
<<<<<<< HEAD
  providers: [
    DatePipe
  ],
=======
>>>>>>> c920dcfc76c4fa9253b0f9bbb087ea944e35a001
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
