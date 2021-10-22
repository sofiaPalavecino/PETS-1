import { Injectable } from "@angular/core";
import { Organizacion } from "../shared/organizacion.interface";

import firebase from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { User } from "../shared/user.interface";

@Injectable({
  providedIn: "root",
})
export class OrganizacionService {
  public oid: string;
  public organizacion: Organizacion; //organización que se está administrando actualmente
  public organizaciones: Organizacion[] = []; //todas las organizaciones que el usuario en sesión administra

  constructor(private afs: AngularFirestore, private authSvc: AuthService) {
    afs.firestore
      .collection("organización")
      .where("administradores", "array-contains", this.authSvc.user$.uid)
      .get()
      .then((querySnapshot) => {
        this.organizacion = null;
        this.organizaciones = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let orgAux: Organizacion = {
            administradores: doc.data()["administradores"],
            mail: doc.data()["email"],
            nombre: doc.data()["nombre"],
            foto: doc.data()["foto"],
            localizacion: doc.data()["localizacion"],
            oid: doc.data()["oid"],
            solicitud_transito: doc.data()["solicitud_transito"],
            contratos: doc.data()["contratos"]
          };
          this.organizaciones.push(orgAux);
          if (this.authSvc.user$.administrando.includes(doc.id)) {
            this.oid = doc.id;
            this.organizacion = orgAux;
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  actualizarOrganizacion(oid: string) {
    this.organizaciones.forEach((orgAux) => {
      if (orgAux.oid == oid) {
        this.oid = oid;
        this.organizacion = orgAux;
        this.afs
          .collection("users")
          .doc(this.authSvc.uid)
          .update({ administrando: oid });
      }
    });
  }
}
