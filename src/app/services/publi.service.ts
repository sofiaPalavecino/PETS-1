import { Injectable } from '@angular/core';
import { Organizacion } from '../shared/organizacion.interface';
import { Publicacion } from '../shared/publicacion';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubliService {

  constructor(private afs: AngularFirestore) { }

  async getOrganizaciones(idAdmin: string):Promise<any>{
    await this.afs.firestore.collection("oranización").where("administradores","array-contains",idAdmin).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        let organizacionesAux:Array<Observable<Organizacion>>
        querySnapshot.forEach((docC) =>{
          organizacionesAux.push(this.afs.doc<Organizacion>(`organización/${docC.id}`).valueChanges())
        })
        return (organizacionesAux)
      }
    })
  }

}
