import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Dia } from '../dia'

@Component({
  selector: 'app-crear-paseo',
  templateUrl: './crear-paseo.page.html',
  styleUrls: ['./crear-paseo.page.scss'],
})
export class CrearPaseoPage implements OnInit {
  //Cant dias no muestra bien, plazo tira undefine(para este hacar algo parecido a los dias)
  costo:number;
  cupo:number;
  plazo:string;
  cantDiasPaseo:number;
  disponibilidad:boolean;
  estado:string;
  diasDisponibles:Array<Dia>;
  
  constructor(private userServ: UserService,){ 
    this.diasDisponibles = new Array<Dia>();
    this.diasDisponibles.push(new Dia("Lunes",false), new Dia("Martes",false), new Dia("Miercoles",false), new Dia("Jueves",false), new Dia("Viernes",false), new Dia("Sabado",false), new Dia("Domingo",false));
    this.estado="Abierto";
    this.disponibilidad=true;   

  }

  ngOnInit() {}

  crearPaseo(){
    this.userServ.crearNuevoPaseo(this.costo,this.cupo,this.plazo,this.cantDiasPaseo,this.disponibilidad,this.estado,this.diasDisponibles);
  }

}
