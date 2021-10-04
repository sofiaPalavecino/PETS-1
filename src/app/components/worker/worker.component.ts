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
  @Input() tipo:string;

  public usuario:Observable<userProfile>=null;


  
  constructor(private PaseosServ:PaseosService, private afs: AngularFirestore,private router: Router,public navCtrl: NavController) {
    
  }

  async ngOnInit() {
    this.usuario = await this.getUsuario(this.idUsuario);
  }


  perfil(){  
    this.router.navigate(["perfil-persona/",this.idUsuario]);
  }
 

  getUsuario(idUsuario){
    return (this.afs.doc<userProfile>(`users/${idUsuario}`).valueChanges())
  }
  

}
