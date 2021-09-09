import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface'; 
import { Paseador } from "../shared/paseador";
import {Cuidador} from "../shared/cuidador.interface"
import {mascota} from "../shared/mascota.interface"
import { PlanPaseo } from "../shared/plan-paseo.interface";
import { PlanCuidador } from "../shared/plan-cuidador.interface";

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, using } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";
import { ConfigMascotaPageModule } from '../config-mascota/config-mascota.module';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public categorias:Array<string>=[];
  public paseador:Paseador=null;
  public planesPaseador:Array<PlanPaseo>=[];
  public cuidador:Cuidador=null;
  public ofertasCuidador:Array<PlanCuidador>=[];
  public mascotas:Array<mascota>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {

      this.afs.firestore.collection("cuidador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
        if (querySnapshot.size>0)
          this.categorias.push("Cuidador");
          querySnapshot.forEach((doc) =>{
            let cuidadorAux:Cuidador ={
              calificacion_promedio:doc.data()["calificacion promedio"],
              idUsuario:doc.data()["idUsuario"],
              cupo:doc.data()["cupo"],
              disponibilidad:doc.data()["disponibilidad"],
              precio_dia:doc.data()["precio dia"],
            }
            this.cuidador=cuidadorAux;
          })
      }).catch((error)=>{
        console.log("Error getting documents: ", error);
      })

      this.afs.firestore.collection("paseador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
        if (querySnapshot.size>0){
          this.categorias.push("Paseador","Calificaciones");
          querySnapshot.forEach((doc) =>{
            let paseadorAux:Paseador ={
              calificacion_promedio:doc.data()["calificacion promedio"],
              idUsuario:doc.data()["idUsuario"],
            }
            console.log(doc.data())
            this.paseador=paseadorAux;
          })
          this.afs.collection('paseador').doc(authSvc.uid).collection('Plan Paseador').get().subscribe((querySnapshot)=>{
            if(querySnapshot.size>0){
              querySnapshot.forEach((doc)=>{
                
              })
            }
          })
        }
          
      }).catch((error)=>{
        console.log("Error getting documents: ", error);
      })

      

      this.afs.collection('users').doc(authSvc.uid).collection('mascota').get().subscribe((querySnapshot)=>{
        if(querySnapshot.size>0){
          this.categorias.push("Mascotas");
          querySnapshot.forEach((doc) =>{
            let mascotaAux:mascota ={
              nombre:doc.data()["nombre"],
            }
            this.mascotas.push(mascotaAux);
          })
        }
      });
  }

  
}