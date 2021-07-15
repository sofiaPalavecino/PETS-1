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
  public organizacion: any;
  public organizaciones: any[] = [];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {
    authSvc.user$.subscribe((user) => {
      afs.firestore.collection("organización").where("administradores", "array-contains", user.uid)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.organizaciones.push(doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
      console.log(this.organizaciones)
    }) 
  }
}
