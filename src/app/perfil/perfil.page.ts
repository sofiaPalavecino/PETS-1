import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { userProfile } from 'src/app/shared/user.interface'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuarios:Array<userProfile> = []
  public funciones:any;
  public id:any=0;

  constructor(public ActivatesToute: ActivatedRoute,public afs:AngularFirestore, public userServ:UserService) { }

  async ngOnInit() {

    
    
    this.afs.firestore.collection("users").where("uid","==",this.ActivatesToute.snapshot.paramMap.get("id")).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc) =>{
          let userAux:userProfile = {
            nombre: doc.data()["nombre"],
            apellido: doc.data()["apellido"],
            uid: doc.data()["uid"],
            email: doc.data()["email"],
            emailVerified: doc.data()["emailVerified"],
            nacimiento: doc.data()["nacimiento"],
            administrando:doc.data()["administrando"],
            DNI:doc.data()["DNI"],
            foto:doc.data()["foto"],
            barrio:doc.data()["barrio"]
          }
          this.usuarios.push(userAux);
        })
      } 
    })
  }

}
