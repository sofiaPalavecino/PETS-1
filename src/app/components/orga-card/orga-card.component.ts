import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizacionesService } from 'src/app/services/organizaciones.service';
import { Organizacion } from 'src/app/shared/organizacion.interface';

@Component({
  selector: 'app-orga-card',
  templateUrl: './orga-card.component.html',
  styleUrls: ['./orga-card.component.scss'],
})
export class OrgaCardComponent implements OnInit {


  @Input() orgaID:string
  public organizacion:Observable<Organizacion>

  constructor(private orgServ:OrganizacionesService) { }

  ngOnInit() {
    this.organizacion=this.orgServ.getOrganizacion(this.orgaID)
  }

}
