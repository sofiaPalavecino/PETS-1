import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  constructor(private afs: AngularFirestore) { 
    this.afs.firestore.collection("especie").get().then((querySnapshot) => {
      let arrayEspecies : Array<string>[];
    });
}
