import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-plan-cuidado',
  templateUrl: './plan-cuidado.page.html',
  styleUrls: ['./plan-cuidado.page.scss'],
})
export class PlanCuidadoPage implements OnInit {

  costo:number;
  maximoMascotas:number;

  constructor(private userServ: UserService) { 
    if(this.userServ.cuidador==undefined){
      this.costo=0;
      this.maximoMascotas=0;
    }
    else{
      this.userServ.cuidador.subscribe((data)=>{
        this.costo=data.precio_dia;
        this.maximoMascotas=data.maximoMascotas;
      })
    }
    
  }

  ngOnInit() {
  }

  async crearCuidado(){
    this.userServ.crearNuevoCuidado(this.costo,this.maximoMascotas);
  }
}
