import { Component, OnInit } from '@angular/core';
import { PaseosService } from "../services/paseos.service";
import { Paseador } from '../shared/paseador';


@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.page.html',
  styleUrls: ['./paseadores.page.scss'],
})
export class PaseadoresPage implements OnInit {

  constructor(private PaseosServ:PaseosService) { }

  ngOnInit() {
    
  }

  

}