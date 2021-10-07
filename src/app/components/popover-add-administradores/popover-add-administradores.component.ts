
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popover-add-administradores',
  templateUrl: './popover-add-administradores.component.html',
  styleUrls: ['./popover-add-administradores.component.scss'],
})
export class PopoverAddAdministradoresComponent {
  constructor(public popoverController: PopoverController, public uServ: UserService,private afs: AngularFirestore,) {}

  private popover = null;
  busqueda:string;
  usuarios:Array<string> = new Array<string>();

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverAddAdministradoresComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await this.popover.present();

    const { role } = await this.popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  buscarUser(){
    this.usuarios = []
    if(this.busqueda != ""){
      console.log(this.busqueda)
      this.afs.firestore
      .collection("users")
      .where("nombre", ">=", this.busqueda)
      .where('nombre', '<=', this.busqueda+ '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user)=>{
          this.usuarios.push(user.data()["nombre"])
        })
     
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      this.afs.firestore
      .collection("users")
      .where("email", ">=", this.busqueda)
      .where('email', '<=', this.busqueda+ '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user)=>{
          this.usuarios.push(user.data()["email"])
        })
     
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      this.afs.firestore
      .collection("users")
      .where("apellido", ">=", this.busqueda)
      .where('apellido', '<=', this.busqueda+ '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user)=>{
          this.usuarios.push(user.data()["apellido"])
        })
     
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }
  }

}