import { Injectable } from '@angular/core';
import { Paseador } from "../shared/paseador";
import { Cuidador } from '../shared/cuidador.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userProfile } from '../shared/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaseosService {

  public listaPaseadores:Observable<Paseador>=null
  public listaCuidadores:Observable<Cuidador>=null

  constructor(private afs: AngularFirestore, private authServ: AuthService) { 
    this.listaCuidadores=this.getCuidadores()
    this.listaPaseadores=this.getPaseadores()
  }

  getPaseadores():Observable<any>{
    return (this.afs.collection<Paseador>(`paseador`).valueChanges({idField: 'docId'}))
  }
  getCuidadores():Observable<any>{
    return (this.afs.collection<Cuidador>(`cuidador`).valueChanges({idField: 'docId'}))
  }

  getPaseador(id: string):Observable<any>{
    return (this.afs.doc<Paseador>(`${id}`).valueChanges({idField: 'docId'})) // Yo: Hice esta función para intentar arreglar "Notificaciones"
  }

  getCuidador(id: string):Observable<any>{
    return (this.afs.doc<Cuidador>(`${id}`).valueChanges({idField: 'docId'})) //Yo: Esta también
  }
  
}
