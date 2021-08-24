import { Injectable } from '@angular/core';
import { Paseador } from "../shared/paseador";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaseosService {

  public paseadores:Array<Paseador>=[]

  constructor(private afs: AngularFirestore) { 

    this.afs.collection("paseador").get().subscribe((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc) =>{
          let paseadorAux:Paseador ={
            calificacion_promedio:doc.data()["calificacion promedio"],
            idUsuario:doc.data()["idUsuario"],
          }
          this.paseadores.push(paseadorAux);
        })
      }
    })

  }
}
