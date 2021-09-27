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

  boton:boolean;

  constructor(private org:OrganizacionService) { 

  }

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
      this.boton = true;
      //this.boton = false;
    }

}
