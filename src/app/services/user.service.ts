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

  public cuidador:any=false;
  public mascotas:mascota[]=[];
  public paseador:any=false;

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {
    
  authSvc.user$.subscribe((user) => {
    console.log("a")
    afs.firestore.collection("paseador").where("idUsuario","array-contains",user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let paseadorAux:Paseador={
          calificacion_promedio:doc.data()["calificacion promedio"],
          idUsuario:doc.data()["idUsuario"],
        }
        this.paseador=paseadorAux;
      });
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })
  });

  authSvc.user$.subscribe((user) => {
    afs.firestore.collection("cuidador").where("idUsuario","array-contains",user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let cuidadorAux:Cuidador={
          calificacion_promedio:doc.data()["calificacion promedio"],
          cupo:doc.data()["cupo"],
          disponibilidad:doc.data()["disponibilidad"],
          idUsuario:doc.data()["idUsuario"],
          precio_dia:doc.data()["precio dia"],
        }
        this.cuidador=cuidadorAux;
      });
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })
  });

  authSvc.user$.subscribe((user) =>{
    afs.collection('users').doc(user.uid).collection('mascota').get().subscribe((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        let mascotaAux:mascota={
          nombre:doc.data()["nombre"],
        }
        this.mascotas.push(mascotaAux);
      });
    })
  })
}
}