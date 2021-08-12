import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'popover-perfil',
  templateUrl: 'popover-perfil.component.html',
  styleUrls: ['./popover-perfil.component.scss']
})
export class PopoverPerfilComponent {
  constructor( private router: Router,public popoverController: PopoverController) {}

  private popover = null;

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverPerfilComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await this.popover.present();

    const { role } = await this.popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  async redirectTo(path){
    await this.popover.dismiss();   
    this.router.navigateByUrl(`/` + path);
  }
}