import { Component, OnInit } from '@angular/core';
import { PaseosService } from '../services/paseos.service';

@Component({
  selector: 'app-cuidadores',
  templateUrl: './cuidadores.page.html',
  styleUrls: ['./cuidadores.page.scss'],
})
export class CuidadoresPage implements OnInit {

  constructor(private pasServ:PaseosService) { }

  ngOnInit() {
  }

}
