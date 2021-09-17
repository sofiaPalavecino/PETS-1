import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-combo-cuidador',
  templateUrl: './combo-cuidador.page.html',
  styleUrls: ['./combo-cuidador.page.scss'],
})
export class ComboCuidadorPage implements OnInit {

  cantidad_dias:number
  costo:number

  constructor(private userServ: UserService) { 
    
  }

  ngOnInit() {
  }

  crearComboCuidado(){
    this.userServ.crearComboCuidador(this.costo,this.cantidad_dias);
  }

}
