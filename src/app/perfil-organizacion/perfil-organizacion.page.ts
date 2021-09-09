import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, HostListener} from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { OrganizacionService } from "../services/organizacion.service";


@Component({
  selector: 'app-perfil-organizacion',
  templateUrl: './perfil-organizacion.page.html',
  styleUrls: ['./perfil-organizacion.page.scss'],
})

export class PerfilOrganizacionPage implements OnInit {

  constructor(private org:OrganizacionService) { }

  idOrganizacion:string;

  ngOnInit() {
  }

  customActionSheetOptions: any = {
    header: 'Organizaciones',
    subHeader: 'Elige que organizacion administrar'
  };

  cambiarOrganizacion(){
    this.org.actualizarOrganizacion(this.idOrganizacion);
  }

  /*doSomethingOnScroll():void {
    let cont = document.getElementById("toolbar");
      cont.setAttribute("name", "Publicaciones");
  }*/

  /*changeToolBarText(){
    let cont = document.getElementById("toolbar");
      cont.setAttribute("name", "Publicaciones");
    }*/

    subirPublicaciones(){
      var capa = document.getElementById("capa");
      var card = document.createElement("div");
      //card.innerHTML='<app-mascota-card>' + '</app-mascota-card>';
      //card.innerHTML='<div><app-mascota-card></app-mascota-card></div>';
      capa.append(card);
      console.log("Seguí así pa");
    }

}
