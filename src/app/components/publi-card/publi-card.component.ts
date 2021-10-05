
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { PubliService } from 'src/app/services/publi.service';
import { Publicacion } from 'src/app/shared/publicacion';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'publi-card',
  templateUrl: './publi-card.component.html',
  styleUrls: ['./publi-card.component.scss'],
})
export class PubliCardComponent implements OnInit {


  idOrganizacion:string;
  @Input() pid:string
  @Input() nombre:string
  @Input() foto:string
  @Input() calificacion:number
  @Input() id:string
  @Input() idOrga:string

  constructor(private org:OrganizacionService, private publiServ:PubliService, private router:Router) { }


  ngOnInit() {}

  

}
