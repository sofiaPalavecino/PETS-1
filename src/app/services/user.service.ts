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
import { Dia } from '../dia';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public categorias:Array<string>=[];
  public paseador:Paseador=null;
  public planesPaseador:Array<PlanPaseo>=[];
  public cuidador$: Observable<Cuidador> = null;
  public ofertasCuidador:Array<PlanCuidador>=[];
  public mascotas:Array<mascota>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {

    this.afs.firestore.collection("cuidador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
      if (querySnapshot.size>0)
        this.categorias.push("Cuidador");
        querySnapshot.forEach((doc) =>{
          this.cuidador$ = this.afs.doc<Cuidador>(`cuidador/${doc.id}`).valueChanges();
        })
        this.afs.firestore.collection('cuidador').where("idUsuario","==",authSvc.uid).get().then((querySnapshot)=>{
          
          if(querySnapshot.size>0){
            querySnapshot.forEach((doc)=>{
              this.afs.collection('cuidador').doc(doc.id).collection('plan cuidador').get().subscribe((querySnapshot)=>{
                if(querySnapshot.size>0){
                  querySnapshot.forEach((doc) =>{
                    let planCuidadorAux:PlanCuidador ={
                      cantidad_dias:doc.data()["cantidad dias"],
                      costo:doc.data()["costo"],
                      cupo:doc.data()["cupo"],
                      disponible:doc.data()["disponible"],
                    }
                    this.ofertasCuidador.push(planCuidadorAux);
                  })
                }
              })
            })
          }
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
          this.paseador=paseadorAux;
        })
        this.afs.firestore.collection('paseador').where("idUsuario","==",authSvc.uid).get().then((querySnapshot)=>{
          
          if(querySnapshot.size>0){
            querySnapshot.forEach((doc)=>{
              this.afs.collection('paseador').doc(doc.id).collection('Plan Paseador').get().subscribe((querySnapshot)=>{
                if(querySnapshot.size>0){
                  querySnapshot.forEach((doc) =>{
                    let planPaseadorAux:PlanPaseo ={
                      costo:doc.data()["costo"],
                      cupo:doc.data()["cupo"],
                      dias:doc.data()["dias"],
                      disponibilidad:doc.data()["disponibilidad"],
                      duracion:doc.data()["duracion"],
                      duracion_plan:doc.data()["duracion plan"],
                      hora:doc.data()["hora"],
                    }
                    this.planesPaseador.push(planPaseadorAux);
                  })
                }
              })
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

  
  async crearNuevoPaseo(costoA:number,cupoA:number,plazoA:string,cantDiasPaseoA:number,disponibilidadA:boolean,estadoA:string,diasDisponiblesA:Array<Dia>){
    
    if(!this.paseador){ //si paseador=false, no existe documento de paseador para el usuario
      
      const creoPaseador = await this.afs.collection('paseador').add({
        calificacion_promedio: 0, 
      })

    }
    
    const creoPlan = await this.afs.collection('paseador').doc().collection('Plan_Paseo').add({
      costo:costoA,
      cupo:cupoA,
      plazo:plazoA,
      cantDiasPaseo:cantDiasPaseoA,
      disponibilidad:disponibilidadA,
      estado:estadoA,
      diasDisponibles:diasDisponiblesA
    });

    
  }
}