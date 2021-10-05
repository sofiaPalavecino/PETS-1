import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userProfile } from '../shared/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Organizacion } from '../shared/organizacion.interface';


@Injectable({
  providedIn: 'root'
})
export class OrganizacionesService {

  public organizaciones:Observable<Organizacion>

  constructor(private afs: AngularFirestore) {
    this.organizaciones=this.getOrganizaciones()
  }

  getOrganizaciones():Observable<any>{
    return (this.afs.collection<Organizacion>(`organización`).valueChanges({idField: 'docId'}))
  }
}
