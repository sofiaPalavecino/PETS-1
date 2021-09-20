import { Injectable } from '@angular/core';
import { Paseador } from "../shared/paseador";
import { Cuidador } from "../shared/cuidador.interface"
import { mascota } from "../shared/mascota.interface"
import { PlanPaseo } from "../shared/plan-paseo.interface";
import { PlanCuidador } from "../shared/plan-cuidador.interface";

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ObtenerDataService {

  constructor(private afs: AngularFirestore,private authSvc: AuthService) { }

  async getTrabajador(idUsuario:string,tipo:string):Promise<any>{
    await this.afs.firestore.collection(tipo).where("idUsuario","==",idUsuario).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((docC) =>{
          if(tipo=="paseador"){
            return (this.afs.doc<Paseador>(`${tipo}/${docC.id}`).valueChanges(),"Paseos");
          }else{
            return (this.afs.doc<Cuidador>(`${tipo}/${docC.id}`).valueChanges(),"Cuidados");
          }
        })
      }
    })
  }

  async getPlanes(idTrabajador:string,tipo:string):Promise<any>{
    let id
    let planesPaseadorAux:Array<Observable<PlanPaseo>> = new Array();
    let planesCuidadorAux:Array<Observable<PlanCuidador>> = new Array();

    await this.afs.firestore.collection(tipo).where("idUsuario","==",idTrabajador).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc)=>{
          id=doc.id
        })
      }
    })

    await this.afs.collection(tipo).doc(id).collection("plan"+tipo).get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((docPC) =>{
          if(tipo=="paseador"){
            planesPaseadorAux.push(this.afs.doc<PlanPaseo>(`${tipo}/${id}/planpaseador/${docPC.id}`).valueChanges()); 
          }
          else{
            planesCuidadorAux.push(this.afs.doc<PlanCuidador>(`${tipo}/${id}/plan${tipo}/${docPC.id}`).valueChanges());
          }
        })
      }
    })

    if(planesCuidadorAux.length != 0) return planesCuidadorAux;
    else return planesPaseadorAux;
  }

  async getMascotas(idUsuario:string):Promise<any>{

    let mascotasAux:Array<Observable<mascota>> = new Array();

    await this.afs.collection('users').doc(idUsuario).collection('mascota').get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc) =>{
          mascotasAux.push(this.afs.doc<mascota>(`users/${idUsuario}/mascota/${doc.id}`).valueChanges());
        })
      }
    });

    return mascotasAux;
  }
}
