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

  async getID(idUsuario,tipo){
    let id
    await this.afs.firestore.collection(tipo).where("idUsuario","==",idUsuario).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc)=>{
          id=doc.id
        })
      }
    })
    return id
  }
  
  async getTrabajador(idUsuario:string,tipo:string):Promise<any>{
    let id=await this.getID(idUsuario,tipo)
    if(tipo=="paseador"){
      return (this.afs.doc<Paseador>(`${tipo}/${id}`).valueChanges())
    }else{
      return (this.afs.doc<Cuidador>(`${tipo}/${id}`).valueChanges())
    }
    
  }

  async getPlanes(idTrabajador:string,tipo:string):Promise<any>{
    let id=await this.getID(idTrabajador,tipo)
    if(tipo=="paseador"){
      return this.afs.collection<PlanPaseo>(`${tipo}/${id}/plan${tipo}`).valueChanges();
    }
    else{
      return this.afs.collection<PlanCuidador>(`${tipo}/${id}/plan${tipo}`).valueChanges();
    }
  }

  async getMascotas(idUsuario:string):Promise<any>{
    return this.afs.doc<mascota>(`users/${idUsuario}/mascota`).valueChanges();
  }
}
