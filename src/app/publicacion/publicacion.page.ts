import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PubliService } from '../services/publi.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { MenuComponent } from '../components/menu/menu.component';
import { OrganizacionService } from "../services/organizacion.service";
import { Publicacion } from '../shared/publicacion';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {

  public publicacion:Observable<Publicacion>=null
  public id:string=""

  constructor(private publiServ:PubliService, private org:OrganizacionService, private route:ActivatedRoute) { }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.publicacion=this.publiServ.getPublicacion(this.id)
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

}
