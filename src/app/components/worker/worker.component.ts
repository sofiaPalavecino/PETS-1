import { Component, Input, OnInit } from '@angular/core';
import { Paseador } from 'src/app/shared/paseador';
import { User,userProfile } from 'src/app/shared/user.interface'; 
import { PaseosService } from 'src/app/services/paseos.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
  
  @Input() idUsuario:string;
  @Input() calificacion_promedio:string;
  public usuarios:Array<userProfile> = []


  constructor(private PaseosServ:PaseosService, private afs: AngularFirestore,private router: Router,public navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.afs.firestore.collection("users").where("uid","==",this.idUsuario).get().then((querySnapshot)=>{
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


  perfil(){
    const id:any=this.usuarios[0].uid;
    console.log(id)
    
    
    
    this.router.navigate(["perfil-persona/",id]);
  }
 
  

}
