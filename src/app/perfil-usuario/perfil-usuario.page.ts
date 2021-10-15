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
  
  constructor(private afs: AngularFirestore, private aServ:AuthService, private userServ: UserService, private popController: PopoverPerfilComponent) {
    userServ.paseador.subscribe(dasda=>{
      console.log(dasda.calificacion_promedio);
      console.log(dasda.contratos);
      console.log(dasda.solicitud_paseo);
    })
  }

  async ngOnInit(){}

  
 
  
}
