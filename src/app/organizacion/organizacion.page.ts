import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, using } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Organizacion } from '../shared/organizacion.interface';
import { OrganizacionesService } from '../services/organizaciones.service';
import { Publicacion } from '../shared/publicacion';
import { PubliService } from '../services/publi.service';


@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.page.html',
  styleUrls: ['./organizacion.page.scss'],
})
export class OrganizacionPage implements OnInit {

  public id:string="";
  public organizacion:Observable<Organizacion>=null
  public publicaciones:Observable<Publicacion>


  constructor(private route: ActivatedRoute,private afs:AngularFirestore,
    private orgServ:OrganizacionesService, private publiServ:PubliService) { }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.organizacion=this.orgServ.getOrganizacion(this.id)
    this.publicaciones=this.publiServ.getPublicaciones(this.id)
  }

}
