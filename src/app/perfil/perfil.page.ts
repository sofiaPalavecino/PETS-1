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
  public id:any=0;

  constructor(public ActivatesToute: ActivatedRoute,public afs:AngularFirestore, public userServ:UserService) { }

  async ngOnInit() {
    
  }

}
