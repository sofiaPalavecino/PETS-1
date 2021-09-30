import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, HostListener, Input} from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { OrganizacionService } from "../services/organizacion.service";
import { PubliService } from '../services/publi.service';


@Component({
  selector: 'app-perfil-organizacion',
  templateUrl: './perfil-organizacion.page.html',
  styleUrls: ['./perfil-organizacion.page.scss'],
})

export class PerfilOrganizacionPage implements OnInit {


  
  idOrganizacion:string;

  constructor(private org:OrganizacionService,private publiServ:PubliService) { 

  }

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

<<<<<<< HEAD
=======

  /*nuevaPublicacion(){
    this.boton = true;
    //this.boton = false;
  }*/
>>>>>>> 754de9b755d7a1028ba0b17e65fd4d209da8ae92

}
