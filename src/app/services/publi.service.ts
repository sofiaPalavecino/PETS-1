import { Injectable } from '@angular/core';
import { Organizacion } from '../shared/organizacion.interface';
import { Publicacion } from '../shared/publicacion';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrganizacionService } from './organizacion.service';

@Injectable({
  providedIn: 'root'
})
export class PubliService {

  public publicaciones:Observable<Publicacion[]>=null;

  constructor(private afs: AngularFirestore, private orgServ:OrganizacionService) {
    this.publicaciones=this.getPublicaciones(this.orgServ.oid)
   }


  getPublicaciones(idOrga:string){
    return this.afs.collection<Publicacion>(`organización/${idOrga}/publicaciones`).valueChanges()
  }

  async nuevaPublicacion(idOrga:string, nombre:string, calificacion:number, especie:string, foto:string, descripcion:string, cuidados:string){
    const nuevaPubli = this.afs.collection('organizacion').doc(idOrga).collection('publicaciones').add({
      nombre:nombre,
      calificacion: calificacion,
      especie:especie,
      foto:foto,
      descripcion: descripcion,
      cuidados: cuidados
    })
  }
  
}
