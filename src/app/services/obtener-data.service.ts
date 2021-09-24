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

  
  
  checkTrabajador(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return (this.afs.doc<Paseador>(`${tipo}/${idUsuario}`).get())
    }else{
      return (this.afs.doc<Cuidador>(`${tipo}/${idUsuario}`).get())
    }
    
  }

  
  getTrabajador(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return (this.afs.doc<Paseador>(`${tipo}/${idUsuario}`).valueChanges())
    }else{
      return (this.afs.doc<Cuidador>(`${tipo}/${idUsuario}`).valueChanges())
    }
    
  }

   getPlanes(idUsuario:string,tipo:string):Observable<any>{
   
    if(tipo=="paseador"){
      return this.afs.collection<PlanPaseo>(`${tipo}/${idUsuario}/plan${tipo}`).valueChanges();
    }
    else{
      return this.afs.collection<PlanCuidador>(`${tipo}/${idUsuario}/plan${tipo}`).valueChanges();
    }
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
