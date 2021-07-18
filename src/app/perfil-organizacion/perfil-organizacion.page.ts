import { Component, OnInit } from '@angular/core';
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

}
