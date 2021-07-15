import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrganizacionService } from "../../services/organizacion.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menuCtrl: MenuController, private aServ:AuthService, private afs: AngularFirestore, private orga:OrganizacionService) { }

  ngOnInit() {}
  
  changeIconMenu(){
    let menuIcon = document.getElementById("menu-icon"); 

    //if(this.menuCtrl.getOpen())

    if(menuIcon.getAttribute('name') == "menu-outline"){
      menuIcon.setAttribute('name', 'close-outline'); 
    } else{
      menuIcon.setAttribute('name', 'menu-outline'); 
    }
  }
}
