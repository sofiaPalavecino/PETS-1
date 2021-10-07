import { Component, OnInit } from '@angular/core';
import { OrganizacionesService } from '../services/organizaciones.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-misorganizaciones',
  templateUrl: './misorganizaciones.page.html',
  styleUrls: ['./misorganizaciones.page.scss'],
})
export class MisorganizacionesPage implements OnInit {


  constructor(private orgServ:OrganizacionesService, private aServ:AuthService) { }

  ngOnInit() {


  }

}
