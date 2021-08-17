import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Especie } from '../shared/especie';

@Injectable({
  providedIn: 'root'
})

export class EspecieService {

  public especies:Especie[] = [];

  constructor(private afs: AngularFirestore) { 
    this.afs.firestore.collection("especie").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
          let especieAux:Especie={
            nombreEspecie:doc.data()["nombreEspecie"],
          }
          this.especies.push(especieAux);
        })
      }).catch((error)=>{
        console.log("Error getting documents: ", error);
      });
    }
  }
