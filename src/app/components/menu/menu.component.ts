import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrganizacionService } from "../../services/organizacion.service";
import { UserService } from 'src/app/services/user.service';
import { ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
 
  static getElementById(arg0: string): HTMLTextAreaElement {
    throw new Error('Method not implemented.');
  }

  notificacion:boolean = false;

  constructor(private menuCtrl: MenuController,private userServ: UserService, private aServ:AuthService, private afs: AngularFirestore, private orga:OrganizacionService) { 
  }

  ngOnInit() {
    this.userServ.paseador.subscribe(element => {
      element.contratos.forEach(contrato => {
        this.afs.doc<ContratoPaseador>("contratoPaseador/"+contrato).valueChanges().subscribe((data)=>{
          if(data.estado == "solicitud") this.notificacion = true;
          console.log(this.notificacion)
        })
      });
    });
  }
  
  changeIconMenu(){
    let menuIcon = document.getElementById("menu-icon"); 
    this.menuCtrl.isOpen().then((result) => {
      if(result){
        menuIcon.setAttribute('name', 'menu-outline'); 
      } else{
        menuIcon.setAttribute('name', 'close-outline'); 
      }
    });
  }

  closeMenu(){
    this.menuCtrl.close();
    this.changeIconMenu();
    //this.changeToolBarText();
  }

  closeSession(){
    this.aServ.logout();
    this.closeMenu()
  }
  
}
