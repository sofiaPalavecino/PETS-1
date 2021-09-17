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
import { ObtenerDataService } from './obtener-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public categorias:Array<string>=[];
  public paseador:Observable<Paseador>=null;
  public planesPaseador:Array<Observable<PlanPaseo>>=[];
  public cuidador: Observable<Cuidador> = null;
  public planesCuidador:Array<Observable<PlanCuidador>>=[];
  public mascotas:Array<Observable<mascota>>=[];

  constructor(private afs: AngularFirestore,private authSvc: AuthService, private obDataServ:ObtenerDataService) {
    this.obDataServ.getTrabajador(this.authSvc.uid,"paseador").then((doc)=>{
      this.paseador = doc;
    })
    this.obDataServ.getTrabajador(this.authSvc.uid,"cuidador").then((doc)=>{
      this.cuidador = doc;
    })
    this.obDataServ.getPlanes(this.authSvc.uid,"paseador").then((doc)=>{
      this.planesPaseador = doc;
    })
    this.obDataServ.getPlanes(this.authSvc.uid,"cuidador").then((doc)=>{
      this.planesCuidador = doc;
    })
    this.obDataServ.getMascotas(this.authSvc.uid).then((doc)=>{
      this.mascotas = doc;
    })
  }

  

  async crearNuevoPaseo(costoA:number,cupoA:number,plazoA:string,cantDiasPaseoA:number,disponibilidadA:boolean,estadoA:string,diasDisponiblesA:Array<Dia>){
    
    console.log(this.paseador)
    if(this.paseador==null){ //si paseador=false, no existe documento de paseador para el usuario
      
      
      const creoPaseador = await this.afs.collection('paseador').add({
        calificacion_promedio: 0, 
        idUsuario: this.authSvc.uid,
      })
      console.log(this.paseador);
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