import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PubliService } from '../services/publi.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { MenuComponent } from '../components/menu/menu.component';
import { OrganizacionService } from "../services/organizacion.service";
import { Publicacion } from '../shared/publicacion';
import { ActivatedRoute } from '@angular/router';
import { Organizacion } from '../shared/organizacion.interface';
import { OrganizacionesService } from '../services/organizaciones.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {

  public publicacion:Observable<Publicacion>=null
  public organizacion:Observable<Organizacion>=null
  public id:string=""
  public idOrga:string=""
  uid:string;
  

  constructor(private publiServ:PubliService, private org:OrganizacionService,private orgServ:OrganizacionesService, private route:ActivatedRoute, private aServ:AuthService) {
      this.uid=this.aServ.user$.uid;
   }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.idOrga= await this.route.snapshot.paramMap.get('idOrga')
    this.organizacion=this.orgServ.getOrganizacion(this.idOrga)
    this.publicacion=this.publiServ.getPublicacion(this.id,this.idOrga)
  }
  
  cambiarOrganizacion(){
    this.org.actualizarOrganizacion(this.org.oid);
  }

  mostrarTexto(id:string){
    let vista=document.getElementById(id).style.display;
	if (vista=='none')
		vista='block';
	else
		vista='none';

	document.getElementById(id).style.display = vista;
  }

  nuevoTransito(){
    this.publiServ.transitar(this.id, "idTRANSITADOR");
  }

}
