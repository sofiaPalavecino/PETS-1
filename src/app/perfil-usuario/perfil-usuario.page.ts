import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})


export class PerfilUsuarioPage{
  user:any;
  

  //categorias=["paseos", "cuidados", "calificaciones","mascotas","calificaciones"];
  categorias:Array<string>=[];
  constructor(public popoverController: PopoverController,private afs: AngularFirestore, private aServ:AuthService, private userServ: UserService) {
    this.user=aServ.user$;
    console.log(userServ.cuidador);
    console.log(userServ.paseador);
    if(userServ.cuidador!=false){
      
      this.categorias.push("Cuidador");

    }
    if(userServ.paseador!=false){
      this.categorias.push("Paseador","Calificaciones");
    }
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
