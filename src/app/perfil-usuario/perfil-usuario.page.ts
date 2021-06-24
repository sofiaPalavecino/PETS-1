import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})


export class PerfilUsuarioPage{

  categorias=["paseos", "cuidados", "calificaciones","mabel","se te ve","arruinada"];

  async getUsers(){
    return firebase.firestore().collection('users').get();
  }
  
  constructor(public popoverController: PopoverController) {
    console.log(this.getUsers());
  }

  

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPerfilComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
}
