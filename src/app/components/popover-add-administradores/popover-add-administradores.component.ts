import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AlertController, PopoverController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { OrganizacionService } from "src/app/services/organizacion.service";

@Component({
  selector: "app-popover-add-administradores",
  templateUrl: "./popover-add-administradores.component.html",
  styleUrls: ["./popover-add-administradores.component.scss"],
})
export class PopoverAddAdministradoresComponent {
  constructor(
    public popoverController: PopoverController,
    public uServ: UserService,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private org:OrganizacionService
  ) {}

  private popover = null;
  busqueda: string;
  usuarios: Array<any>;
  uids: Array<any>;
  is:string;

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverAddAdministradoresComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    await this.popover.present();

    const { role } = await this.popover.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  async buscarUser() {
    this.usuarios = new Array<any>();
    this.uids = new Array<any>();
    let busqueda = this.busqueda;
    if (busqueda.length != 0) {
      console.log(this.busqueda);
      await this.afs.firestore
        .collection("users")
        .where("nombre", ">=", busqueda)
        .where("nombre", "<=", busqueda + "\uf8ff")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            this.usuarios.push(user.data());
            this.uids.push(user.data()["uid"]);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      await this.afs.firestore
        .collection("users")
        .where("email", ">=", busqueda)
        .where("email", "<=", busqueda + "\uf8ff")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            if (!this.uids.includes(user.data()["uid"])) {
              this.uids.push(user.data()["uid"]);
              this.usuarios.push(user.data());
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      await this.afs.firestore
        .collection("users")
        .where("apellido", ">=", busqueda)
        .where("apellido", "<=", busqueda + "\uf8ff")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            if (!this.uids.includes(user.data()["uid"])) {
              this.uids.push(user.data()["uid"]);
              this.usuarios.push(user.data());
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }

  solicitarAdministracion(index: string) {
    this.usuarios[index]
    this.afs.collection("users").doc(this.usuarios[index].uid)
      .update({solicitud_admin:firebase.firestore.FieldValue.arrayUnion(this.org.oid)}) 
    this.popover.dismiss();
    this.presentAlert("Listo!", "Solicitud enviada");
  }

  async presentAlert(subtitulo:string,mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
