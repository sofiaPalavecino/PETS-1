import { Injectable } from '@angular/core';
import { mascota } from '../shared/mascota.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  public idMascotas:Array<string>

  constructor(private afs: AngularFirestore) { }

  getMascotas(idMascota:Array<string>,idUsuario:string){
    let mascotas : Array<mascota>
    idMascota.forEach((id)=>{
      this.afs.doc<mascota>(`users/${idUsuario}/mascota/${id}`).valueChanges({idField:"idMascota"}).subscribe((mascota)=>{
        mascotas.push(mascota)
      })
    })
    return(mascotas)
  }

  getMascota(idMascota:string,idUsuario:string){
    
    return(this.afs.doc<mascota>(`users/${idUsuario}/mascota/${idMascota}`).valueChanges({idField:"idMascota"}))
  }
}
