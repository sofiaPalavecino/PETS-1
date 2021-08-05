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
  userA:any;
  
  categorias=["paseos", "cuidados", "calificaciones","mabel","se te ve","arruinada"];



  async getUsers(){
    const docRef = this.afs.doc(`users/hD8HS8Qzaqc1Ipr74KIxEbxvJ6s2/mascota/`)
    const doc2= await docRef.get().toPromise();
    if (!doc2.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc2.data());
    }
    
    //const mascotaRef: AngularFirestoreDocument<mascota> = this.afs.doc(`users/${user.uid}`).collection("mascota");

    //subcolección
    const cityRef = this.afs.collection('users').doc('hD8HS8Qzaqc1Ipr74KIxEbxvJ6s2');

    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
    //return this.afs.collection("users").doc("hD8HS8Qzaqc1Ipr74KIxEbxvJ6s2").get();
    this.user= doc.data(); 
  }

  
  
  constructor(public popoverController: PopoverController,private afs: AngularFirestore, private aServ:AuthService, private userServ: UserService) {
    this.getUsers()
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
