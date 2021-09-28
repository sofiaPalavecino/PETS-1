
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { PubliService } from 'src/app/services/publi.service';
import { Publicacion } from 'src/app/shared/publicacion';

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

  constructor(private org:OrganizacionService, private publiServ:PubliService) { }


  ngOnInit() {}

}
