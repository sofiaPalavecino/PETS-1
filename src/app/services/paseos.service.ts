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
    return (this.afs.collection<Paseador>(`paseador`, ref => ref.where(ref.id,"!=",this.authServ.user$.uid)).valueChanges({idField: 'docId'}))
  }
  getCuidadores():Observable<any>{
    return (this.afs.collection<Cuidador>(`cuidador`, ref => ref.where("uid", "==", this.authServ.user$.uid)).valueChanges({idField: 'docId'}))
  }
  
}
