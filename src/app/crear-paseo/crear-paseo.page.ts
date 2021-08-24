import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Dia } from '../dia'

@Component({
  selector: 'app-crear-paseo',
  templateUrl: './crear-paseo.page.html',
  styleUrls: ['./crear-paseo.page.scss'],
})
export class CrearPaseoPage implements OnInit {

  costo:number;
  cupo:number;
  plazo:string;
  cantDiasPaseo:number;
  disponibilidad:boolean;
  estado:string;
  diasDisponibles:Array<Dia>;
  
  constructor(private aServ:AuthService){ 
    this.diasDisponibles = new Array<Dia>();
    this.diasDisponibles.push(new Dia("Lunes",false), new Dia("Martes",false), new Dia("Miercoles",false), new Dia("Jueves",false), new Dia("Viernes",false), new Dia("Sabado",false), new Dia("Domingo",false));
  }

  ngOnInit() {}

  crearPaseo(){
    this.aServ.crearNuevoPaseo(this.costo,this.cupo,this.plazo,this.cantDiasPaseo,this.disponibilidad,this.estado,this.diasDisponibles)
  }

}
