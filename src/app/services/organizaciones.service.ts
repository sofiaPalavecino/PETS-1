import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userProfile } from '../shared/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Organizacion } from '../shared/organizacion.interface';
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class OrganizacionesService {

  public uid:string
  public organizaciones:Observable<Organizacion>
  public administrando:Observable<Organizacion>
  public usuario:userProfile

  constructor(private afs: AngularFirestore, private authSvc: AuthService) {
    this.authSvc.afAuth.authState.subscribe((usuario)=>{
      this.uid=usuario.uid
    })
    let i = 0;
    this.organizaciones=this.getOrganizaciones()
    /*while(this.authSvc.user$.uid === undefined && i === 0){
      if(this.authSvc.user$.uid != undefined){
        this.administrando=this.getAdministrando(this.authSvc.user$.uid)  // lpm
        i = 1;
      }
    }*/
  }

  getOrganizaciones():Observable<any>{
    return (this.afs.collection<Organizacion>(`organización`).valueChanges({idField: 'docId'}))
  }

  getOrganizacion(id:string):Observable<any>{
    return (this.afs.doc<Organizacion>(`organización/${id}`).valueChanges({idField: 'docId'}))
  }

  getAdministrando(id:string):Observable<any>{
    return (this.afs.collection<Organizacion>(`organización`, ref=>(ref.where("administradores", "array-contains", this.uid))).valueChanges({idField: 'docId'}))
  }

}
