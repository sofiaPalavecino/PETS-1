import { Injectable } from '@angular/core';
import { Organizacion } from '../shared/organizacion.interface';
import { Publicacion } from '../shared/publicacion';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionesService } from './organizaciones.service';
import firebase from "firebase/app";
import "firebase/firestore";
import { contratoTransito } from '../shared/transito';


@Injectable({
  providedIn: 'root'
})
export class PubliService {



  public publicaciones:Observable<Publicacion>=null;

  constructor(private afs: AngularFirestore, private org:OrganizacionService, private orga: OrganizacionesService) {
    this.publicaciones=this.getPublicaciones(this.org.oid)
   }

  fotoEstandar(especie:string){
    let estandar:string
    if(especie == "Perro"){
      return estandar =  "https://firebasestorage.googleapis.com/v0/b/pets-5ca11.appspot.com/o/perroEstandar.jpg?alt=media&token=4add281e-1ad2-4f21-8f5e-0ce8fb173ef1"
    }
    else if(especie == "Gato"){
      return estandar =  "https://firebasestorage.googleapis.com/v0/b/pets-5ca11.appspot.com/o/gatoEstandar.png?alt=media&token=0b534a60-7ffa-45be-837d-6dda0b92765c"
    }
    else if(especie == "Ornitorrinco"){
      return estandar =  "https://firebasestorage.googleapis.com/v0/b/pets-5ca11.appspot.com/o/ornitorrincoEstandar.jpg?alt=media&token=cb46ffa7-3f68-4c4e-b24a-578bc1e87178"
    }
    else if(especie ==  "Conejo"){
      
      return estandar =  "https://firebasestorage.googleapis.com/v0/b/pets-5ca11.appspot.com/o/conejoEstandar.jpg?alt=media&token=21a71bb0-c533-46ef-a9bc-aafa606fb807"
    }
    else{
      return estandar = "https://firebasestorage.googleapis.com/v0/b/pets-5ca11.appspot.com/o/mascotaEstandar.png?alt=media&token=3eb6db17-0107-4a9a-808a-da0067a261ed"
    }
  }

  getPublicaciones(idOrga:string):Observable<any>{
    return this.afs.collection<Publicacion>(`organización/${idOrga}/publicaciones`).valueChanges({idField: 'docId'})
  }

  getPublicacion(idPublicacion:string, idOrga:string):Observable<any>{
    return this.afs.doc<Publicacion>(`organización/${idOrga}/publicaciones/${idPublicacion}`).valueChanges({idField: 'docId'})
  }

  async  nuevaPublicacion(nombre:string, especie:string, descripcion:string, cuidados:string){
    let estandar:String
    estandar = this.fotoEstandar(especie)
    const nuevaPubli = this.afs.collection('organización').doc(this.org.oid).collection('publicaciones').add({
      nombre:nombre,
      calificacion: null,
      especie:especie,
      foto:estandar,
      descripcion: descripcion,
      cuidados: cuidados,
      fecha: new Date()
    })
  }

  getContrato(){
    
  }

  getTransito(id:string):Observable<any>{
    console.log(id);
    
    return (this.afs.doc<contratoTransito>(`contratoTransito/${id}`).valueChanges({idField: 'docId'}))
  }

  transitar(idAnimal:string, idTransitante:string, idOrganizacion: string, fecha: string){
    const nuevoTransito = this.afs.collection('contratoTransito').add({
      estado: "solicitud",
      fecha: fecha,
      idAnimal: idAnimal,
      idOrganizacion: idOrganizacion,
      idTransitante: idTransitante
    })
    nuevoTransito.then((data)=> {
      this.afs.doc(`organización/${idOrganizacion}`).update({
        solicitud_transito: firebase.firestore.FieldValue.arrayUnion(data.id)
      })
    });
  }

}
