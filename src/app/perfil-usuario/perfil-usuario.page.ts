import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Cuidador } from '../shared/cuidador.interface';



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})


export class PerfilUsuarioPage {
  user:any;
<<<<<<< HEAD
=======
  

  //categorias=["paseos", "cuidados", "calificaciones","mascotas","calificaciones"];
>>>>>>> 558f584528a94b5f30dac62d24727acede81c603
  
  constructor(
    private afs: AngularFirestore, 
    private aServ:AuthService, 
    private userServ: UserService, 
    private popController: PopoverPerfilComponent) {
   
      /*let a:any=userServ.cuidador$.subscribe((value)=>{

      })*/
  }

<<<<<<< HEAD
  async ngOnInit(){
    
  }
=======
  
>>>>>>> 558f584528a94b5f30dac62d24727acede81c603

  
 
  
}
