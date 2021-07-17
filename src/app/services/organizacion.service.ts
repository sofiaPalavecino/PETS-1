import { Injectable } from '@angular/core';
import { Organizacion } from '../shared/organizacion.interface';

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  // public organizacion: Observable<Organizacion>;
  public organizacion:Organizacion;
  public organizaciones: Organizacion[] = [];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {
    authSvc.user$.subscribe((user) => {
      afs.firestore.collection("organización").where("administradores", "array-contains", user.uid)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              let orgAux:Organizacion = {
                administradores:doc.data()["administradores"],
                mail:doc.data()["email"],
                nombre:doc.data()["nombre"],
                foto:doc.data()["foto"],
                localizacion:doc.data()["localizacion"],
                oid:doc.data()["oid"],
              }

              this.organizaciones.push(orgAux);
              if(user.administrando = doc.id){
                this.organizacion = orgAux;
              }
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
      console.log(this.organizaciones)
    }) 
  }

  actualizarOrganizacion(oid:string){
    this.organizaciones.forEach(orgAux => {
      if(orgAux.oid == oid){
        this.organizacion = orgAux;
      }
    });
  }
}
