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
    
    let funciones:Promise<Map<any,any>>=this.formarPerfil(this.authSvc.uid);
    
    funciones.then((data)=> {
      console.log(data)
      this.categorias=data.get("categorias");
      this.paseador$=data.get("paseador");
      this.planesPaseador$=data.get("planes");
      this.cuidador$ =data.get("cuidador");
      this.ofertasCuidador$=data.get("ofertas");
      this.mascotas$=data.get("mascotas");
    })
    
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

  async formarPerfil(id:any):Promise<Map<any,any>>{
    var funciones:Map<any,any>=new Map();
    let categorias:Array<string>=[];
    let paseador$:Observable<Paseador>=null;
    let planesPaseador$:Array<Observable<PlanPaseo>>=[]
    let cuidador$: Observable<Cuidador> = null;
    let ofertasCuidador$:Array<Observable<PlanCuidador>>
    let mascotas$:Array<Observable<mascota>>=[];

    

    this.afs.firestore.collection("cuidador").where("idUsuario","==",id).get().then((querySnapshot) => {
      if (querySnapshot.size>0)
        categorias.push("Cuidador");
        querySnapshot.forEach((docC) =>{
          cuidador$ = this.afs.doc<Cuidador>(`cuidador/${docC.id}`).valueChanges();
          
          funciones.set("cuidador",cuidador$);
          this.afs.collection('cuidador').doc(docC.id).collection('plan cuidador').get().subscribe((querySnapshot)=>{
            if(querySnapshot.size>0){
              querySnapshot.forEach((docPC) =>{
                
                ofertasCuidador$.push(this.afs.doc<PlanCuidador>(`cuidador/${docC.id}/plan cuidador/${docPC.id}`).valueChanges());
                
              })
              funciones.set("ofertas",ofertasCuidador$)
            }
          })
        })
  
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })

    this.afs.firestore.collection("paseador").where("idUsuario","==",id).get().then((querySnapshot) => {
      if (querySnapshot.size>0){
        categorias.push("Paseador","Calificaciones");
        querySnapshot.forEach((docP) =>{
            paseador$=this.afs.doc<Cuidador>(`paseador/${docP.id}`).valueChanges();
            funciones.set("paseador",paseador$)
            this.afs.collection('paseador').doc(docP.id).collection('Plan Paseador').get().subscribe((querySnapshot)=>{
              if(querySnapshot.size>0){
                querySnapshot.forEach((docPP) =>{
                  planesPaseador$.push(this.afs.doc<PlanPaseo>(`paseador/${docP.id}/Plan Paseador/${docPP.id}`).valueChanges());
                })
                funciones.set("planes",planesPaseador$)
              }
            })
        })
      }
    }).catch((error)=>{
      console.log("Error getting documents: ", error);
    })

    this.afs.collection('users').doc(id).collection('mascota').get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        categorias.push("Mascotas");
        querySnapshot.forEach((doc) =>{
          mascotas$.push(this.afs.doc<mascota>(`users/${id}/mascota/${doc.id}`).valueChanges());
        })
        funciones.set("mascotas",mascotas$)
      }
    });
    await funciones.set("categorias",categorias)
    return(funciones)
  }
}