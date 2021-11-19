import { Injectable , OnInit} from '@angular/core';
import { Paseador } from "../shared/paseador";
import { Cuidador } from '../shared/cuidador.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userProfile } from '../shared/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Chat } from '../shared/chat.interface';
import { AuthService } from './auth.service';
import { Mensaje } from '../shared/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService  implements OnInit {

  public chatsUsuarioCliente:Observable<Chat>;
  public chatsUsuarioTrabajador:Observable<Chat>; 

  constructor(private afs: AngularFirestore,private authSvc: AuthService,) {
    this.authSvc.afAuth.authState.subscribe((user)=>{
      if(user){
        this.chatsUsuarioCliente=this.getChatsCliente(user.uid)
        this.chatsUsuarioTrabajador=this.getChatsTrabajador(user.uid)
      }
    })
  }

  ngOnInit(){
    
  }

  

  getChatsCliente(idUsuario:string):Observable<any>{
    return (this.afs.collection<Chat>(`chat`, ref => ref.where("idCliente","==",idUsuario)).valueChanges({idField:"idChat"}))
  }

  getChatsTrabajador(idUsuario:string):Observable<any>{
    return (this.afs.collection<Chat>(`chat`, ref => ref.where("idTrabajador","==",idUsuario)).valueChanges({idField:"idChat"}))
  }
  getMensajes(idChat:string):Observable<any>{
    return (this.afs.collection<Mensaje>(`chat/${idChat}/mensajes`, ref => ref.orderBy("hora")).valueChanges({idField:"idMensaje"}))
  }
  getDestinatario(idDestinatario):Observable<any>{
    return(this.afs.doc<userProfile>(`users/${idDestinatario}`).valueChanges({idField:"idDestinatario"}))
  }
  enviarMensaje(contenido:string,emisor:string,idChat:string){
    
    const nuevoMensaje=this.afs.collection('chat').doc(idChat).collection('mensajes').add({
      emisor:emisor,
      contenido: contenido,
      hora: new Date()
    })
  }
  async checkIfChatExists(idCliente:string, idTrabajador:string){
    var respuesta:boolean=true
    await this.afs.collection<Chat>(`chat`, ref => ref.where("idCliente","==",idCliente).where("idTrabajador","==",idTrabajador)).get().toPromise().then((chat)=>{
      
      if(chat.size==0){
        respuesta=true
      }else{
        respuesta=false
      }
    })
    await this.afs.collection<Chat>(`chat`, ref => ref.where("idCliente","==",idTrabajador).where("idTrabajador","==",idCliente)).get().toPromise().then((chat)=>{
      
      if(chat.size==0 && respuesta==true){
        respuesta=true
      }else{
        respuesta=false
      }
      
    })
    return respuesta
  }
  async crearChat(idCliente:string, idTrabajador:string){
    if(await this.checkIfChatExists(idCliente, idTrabajador)==true){
      this.afs.collection("chat").add({
        idCliente: idCliente,
        idTrabajador: idTrabajador
      })
    }
    
  }

}
