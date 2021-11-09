import { Injectable , OnInit} from '@angular/core';
import { Paseador } from "../shared/paseador";
import { Cuidador } from '../shared/cuidador.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userProfile } from '../shared/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Chat } from '../shared/chat.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService  implements OnInit {

  public chatsUsuarioCliente:Observable<Chat[]>;
  public chatsUsuarioTrabajador:Observable<Chat[]>; 

  constructor(private afs: AngularFirestore,private authSvc: AuthService,) {
    this.authSvc.afAuth.authState.subscribe((user)=>{
      if(user){
        this.getChatsCliente(user.uid)
        this.chatsUsuarioCliente=this.getChatsCliente(user.uid)
        this.chatsUsuarioTrabajador=this.getChatsTrabajador(user.uid)
        
      }
    })
  }

  ngOnInit(){
    
  }

  getChatsCliente(idUsuario:string){
    return (this.afs.collection<Chat>(`chat`, ref => ref.where("idCliente","==",idUsuario)).valueChanges({idField:"idChat"}))
  }

  getChatsTrabajador(idUsuario:string){
    return (this.afs.collection<Chat>(`chat`, ref => ref.where("idTrabajador","==",idUsuario)).valueChanges({idField:"idChat"}))
  }
}
