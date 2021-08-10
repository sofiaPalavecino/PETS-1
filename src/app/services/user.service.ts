import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface'; 
import { Paseador } from "../shared/paseador";
import {Cuidador} from "../shared/cuidador.interface"
import {mascota} from "../shared/mascota.interface"

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, using } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public categorias:Array<string>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {

      this.afs.firestore.collection("cuidador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
        if (querySnapshot.size>0)
          this.categorias.push("Cuidador");
      }).catch((error)=>{
        console.log("Error getting documents: ", error);
      })

      this.afs.firestore.collection("paseador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
        if (querySnapshot.size>0)
          this.categorias.push("Paseador","Calificaciones");
      }).catch((error)=>{
        console.log("Error getting documents: ", error);
      })

      this.afs.collection('users').doc(authSvc.uid).collection('mascota').get().subscribe((querySnapshot)=>{
        if(querySnapshot.size>0) this.categorias.push("Mascotas");
      });
  }

  
}