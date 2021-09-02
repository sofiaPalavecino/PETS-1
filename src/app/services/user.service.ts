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
  public paseador$:Observable<Paseador>=null;
  public planesPaseador$:Array<Observable<PlanPaseo>>=[];
  public cuidador$: Observable<Cuidador> = null;
  public ofertasCuidador$:Array<Observable<PlanCuidador>>=[];
  public mascotas$:Array<Observable<mascota>>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {

    this.afs.firestore.collection("cuidador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
      if (querySnapshot.size>0)
        this.categorias.push("Cuidador");
        querySnapshot.forEach((docC) =>{
          this.cuidador$ = this.afs.doc<Cuidador>(`cuidador/${docC.id}`).valueChanges();
          this.afs.collection('cuidador').doc(docC.id).collection('plan cuidador').get().subscribe((querySnapshot)=>{
            if(querySnapshot.size>0){
              querySnapshot.forEach((docPC) =>{
                this.ofertasCuidador$.push(this.afs.doc<PlanCuidador>(`cuidador/${docC.id}/plan cuidador/${docPC.id}`).valueChanges());
              })
            }
          })
        })
  
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })

    this.afs.firestore.collection("paseador").where("idUsuario","==",authSvc.uid).get().then((querySnapshot) => {
      if (querySnapshot.size>0){
        this.categorias.push("Paseador","Calificaciones");
        querySnapshot.forEach((docP) =>{
            this.paseador$=this.afs.doc<Cuidador>(`paseador/${docP.id}`).valueChanges();
            this.afs.collection('paseador').doc(docP.id).collection('Plan Paseador').get().subscribe((querySnapshot)=>{
              if(querySnapshot.size>0){
                querySnapshot.forEach((docPP) =>{
                  this.planesPaseador$.push(this.afs.doc<PlanPaseo>(`paseador/${docP.id}/Plan Paseador/${docPP.id}`).valueChanges());
                })
              }
            })
        })
      }
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })

    this.afs.collection('users').doc(authSvc.uid).collection('mascota').get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        this.categorias.push("Mascotas");
        querySnapshot.forEach((doc) =>{
          this.mascotas$.push(this.afs.doc<mascota>(`users/${authSvc.uid}/mascota/${doc.id}`).valueChanges());
        })
      }
    });
  }
  
  async crearNuevoPaseo(costoA:number,cupoA:number,plazoA:string,cantDiasPaseoA:number,disponibilidadA:boolean,estadoA:string,diasDisponiblesA:Array<Dia>){
    
    if(this.paseador$==null){ //si paseador=false, no existe documento de paseador para el usuario
      
      const creoPaseador = await this.afs.collection('paseador').add({
        calificacion_promedio: 0, 
        idUsuario: this.authSvc.uid,
      })

      console.log(this.paseador$);

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