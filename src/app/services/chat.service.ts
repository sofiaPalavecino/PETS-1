import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  constructor(private afs: AngularFirestore,private authSvc: AuthService) { }

  // addChatMessage(msg){
  //   return this.afs.collection("message").add({
  //     msg,
  //     from: this.authSvc.uid,
  //     createdAt: firebase.firestore.FieldValue.
  //   });
  // }

}
