import { Injectable, Query } from '@angular/core';
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
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public categorias:Array<string>=[];
  public paseador$:Observable<Paseador>=null;
  public planesPaseador$:Array<Observable<PlanPaseo>>;
  public cuidador$: Observable<Cuidador> = null;
  public ofertasCuidador$:Array<Observable<PlanCuidador>>=[];
  public mascotas:Array<Observable<mascota>>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService) {
    this.planesPaseador$=new Array(); 
  }

  async getTrabajador(idUsuario:string,tipo:string){
    await this.afs.firestore.collection(tipo).where("idUsuario","==",idUsuario).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((docC) =>{
          return (this.afs.doc<Cuidador>(`${tipo}/${docC.id}`).valueChanges());
        })
      }
    }).catch((error)=>{
      return (error);
    })
  }

  async getPlanes(idTrabajador:string,tipo:string){
    await this.afs.collection(tipo).doc(idTrabajador).collection(`plan ${tipo}`).get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        let planesCuidadorAux=new Array()
        querySnapshot.forEach((docPC) =>{
          planesCuidadorAux.push(this.afs.doc<PlanCuidador>(`${tipo}/${idTrabajador}/plan ${tipo}/${docPC.id}`).valueChanges());
        })
        return (planesCuidadorAux)
      }
    })
    return(false)
  }

  async getMascotas(idUsuario:string){
    await this.afs.collection('users').doc(idUsuario).collection('mascota').get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        let mascotasUsuarioAux=new Array()
        querySnapshot.forEach((doc) =>{
          mascotasUsuarioAux.push(this.afs.doc<mascota>(`users/${idUsuario}/mascota/${doc.id}`).valueChanges());
        })
        return (mascotasUsuarioAux)
      }
    });
    return (false)
  }

  async crearNuevoPaseo(costoA:number,cupoA:number,plazoA:string,cantDiasPaseoA:number,disponibilidadA:boolean,estadoA:string,diasDisponiblesA:Array<Dia>){
    
    console.log(this.paseador$)
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