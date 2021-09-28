import { Component, Input, OnInit } from '@angular/core';
import { Paseador } from 'src/app/shared/paseador';
import { User,userProfile } from 'src/app/shared/user.interface'; 
import { PaseosService } from 'src/app/services/paseos.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PlanPaseo } from 'src/app/shared/plan-paseo.interface';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
  
  @Input() idUsuario:string;
  @Input() calificacion_promedio:string;
  public usuario:Observable<userProfile>=null;


  
  constructor(private PaseosServ:PaseosService, private afs: AngularFirestore,private router: Router,public navCtrl: NavController) {
    
  }

  ngOnInit() {
    console.log(this.idUsuario)
    this.usuario = this.afs.doc<userProfile>(`user/${this.idUsuario}`).valueChanges()
    this.usuario.subscribe((data) => {
      console.log(data.uid)
    })
    /*this.afs.firestore.collection("paseador").get().then((querySnapshot)=>{
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
      } */
  }


  perfil(){  
    this.router.navigate(["perfil-persona/",this.idUsuario]);
  }
 
  

}
