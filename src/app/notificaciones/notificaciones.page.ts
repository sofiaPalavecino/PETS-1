import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { OrganizacionService } from '../services/organizacion.service';
import { OrganizacionesService } from '../services/organizaciones.service';
import { PaseosService } from '../services/paseos.service';
import { Paseador } from '../shared/paseador';
import { Cuidador } from '../shared/cuidador.interface';
import { Organizacion } from '../shared/organizacion.interface';
import { DatePipe } from '@angular/common';
import { userProfile } from '../shared/user.interface';
import { ObtenerDataService } from '../services/obtener-data.service';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  

  public administrando:Observable<Organizacion>=null
  public user: Observable<userProfile>=null
  uid:string
  tab: string;
  tabPrevia: string;

  constructor(private authSvc: AuthService, private userServ: UserService, private org: OrganizacionService, private trabajo: PaseosService, private date:DatePipe, private orgas: OrganizacionesService, private ods: ObtenerDataService) {
    this.authSvc.afAuth.authState.subscribe((usuario)=>{
      this.uid=usuario.uid
      this.administrando = this.orgas.getAdministrando(this.uid);
      this.user = this.ods.getUser(this.uid);
      this.user.subscribe((usuario)=>{
        console.log(usuario.cambioDeEstado) //map de cambioDeEstado es un Object
    })
    })
  }

  ngOnInit() {
    this.tab = 'Servicios';
    this.tabPrevia = this.tab;
    

  
  }



  cambiarPestania(tab:string){
    document.getElementById(this.tabPrevia+'I').style.color = "#666666";
    document.getElementById(this.tabPrevia+'L').style.color = "#666666";
    this.tab = tab;
    document.getElementById(tab+'I').style.color = "#7bd7b5";
    document.getElementById(tab+'L').style.color = "#7bd7b5";
    this.tabPrevia = tab;
  }
}
