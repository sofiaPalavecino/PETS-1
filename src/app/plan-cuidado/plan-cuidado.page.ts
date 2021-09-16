import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-plan-cuidado',
  templateUrl: './plan-cuidado.page.html',
  styleUrls: ['./plan-cuidado.page.scss'],
})
export class PlanCuidadoPage implements OnInit {

  costo:number;
  cupo:number;

  constructor(private userServ: UserService) { 
    this.userServ.cuidador$.subscribe((data)=>{
      this.costo=data.precio_dia;
      this.cupo=data.cupo;
    })
  }

  ngOnInit() {
  }

  async crearCuidado(){
    this.userServ.crearNuevoCuidado(this.costo,this.cupo);
  }
}
