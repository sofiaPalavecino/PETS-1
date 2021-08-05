import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface'; 
import { Paseador } from "../shared/paseador";
import {Cuidador} from "../shared/cuidador.interface"
import {mascota} from "../shared/mascota.interface"

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cuidador:Cuidador;
  public mascotas:mascota[]=[];
  public paseador:Paseador;

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {
    /*authSvc.user$.subscribe((user) => {
      afs.firestore.collection("paseador").where("idUsuario", "array-contains", user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
             doc.data() is never undefined for query doc snapshots
            let paseadorAux:Paseador = {
              administradores:doc.data()["calificacion promedio"],
              mail:doc.data()["email"],

            this.organizaciones.push(orgAux);
            if(user.administrando == doc.id){
              this.organizacion = orgAux;
            }
        });
      })
    }*/
  }
}
