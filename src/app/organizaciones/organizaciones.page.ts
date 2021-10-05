import { Component, OnInit } from '@angular/core';
import { OrganizacionesService } from '../services/organizaciones.service';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.page.html',
  styleUrls: ['./organizaciones.page.scss'],
})
export class OrganizacionesPage implements OnInit {

  constructor(private orgServ:OrganizacionesService) { }

  ngOnInit() {
  }

}
