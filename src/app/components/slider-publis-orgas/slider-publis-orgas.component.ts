import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrganizacionesService } from 'src/app/services/organizaciones.service';
import { Organizacion } from 'src/app/shared/organizacion.interface';
import { Publicacion } from 'src/app/shared/publicacion';
import { PubliService } from 'src/app/services/publi.service';


@Component({
  selector: 'app-slider-publis-orgas',
  templateUrl: './slider-publis-orgas.component.html',
  styleUrls: ['./slider-publis-orgas.component.scss'],
})
export class SliderPublisOrgasComponent implements OnInit {

  @Input() orgaID:string
  public organizacion:Observable<Organizacion>
  public publicaciones:Observable<Publicacion>
  public ahora=new Date();

  constructor(private afs:AngularFirestore, private orgServ:OrganizacionesService, private pubServ: PubliService) { }

  ngOnInit() {
    /*this.ahora.setDate(this.ahora.getDate()-2)
    this.organizacion=this.orgServ.getOrganizacion(this.orgaID)
    this.publicaciones=this.pubServ.getPublicaciones(this.orgaID)
    console.log(this.publicaciones)*/
  }

  /*pasarADate(fecha:any){
    return(fecha.toDate('yyyy/MM/dd h:mm:ss a'))
  }*/

}
