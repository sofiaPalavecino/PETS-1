import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Dia } from '../dia'
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

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
  cantidadDias:number;
  idPlan:string;
  
  constructor(private userServ: UserService,public alertController: AlertController,private router: Router,private route:ActivatedRoute){ 
    this.diasDisponibles = new Array<Dia>();
    this.diasDisponibles.push(new Dia("Lunes",false), new Dia("Martes",false), new Dia("Miercoles",false), new Dia("Jueves",false), new Dia("Viernes",false), new Dia("Sabado",false), new Dia("Domingo",false));
    this.estado="Abierto";
    this.disponibilidad=true;   

  }

  async ngOnInit() {
    this.costo=0
    this.cupo=0
    this.cantDiasPaseo=0
    this.idPlan = await this.route.snapshot.paramMap.get("idPlan");
  }

  checkDatos(tipo:string){
    console.log(this.diasDisponibles);
    
    this.diasDisponibles.forEach((dia)=>{
      if(dia.estado==true){
        this.cantidadDias=this.cantidadDias+1
      }
    })
    if(this.cantidadDias==0 || this.costo==0 || this.cupo==0 || this.cantidadDias<this.cantDiasPaseo){
      this.presentAlert("Datos incompletos","Por favor, ingresar todos los datos")
    }
    else{
      if(tipo=="update"){
        this.userServ.actualizarPaseo(this.idPlan,this.costo,this.cupo,this.plazo,this.cantDiasPaseo,this.disponibilidad,this.estado,this.diasDisponibles[0],this.diasDisponibles[1],this.diasDisponibles[2],this.diasDisponibles[3],this.diasDisponibles[4],this.diasDisponibles[5],this.diasDisponibles[6])
      }else{this.userServ.crearNuevoPaseo(this.costo,this.cupo,this.plazo,this.cantDiasPaseo,this.disponibilidad,this.estado,this.diasDisponibles[0],this.diasDisponibles[1],this.diasDisponibles[2],this.diasDisponibles[3],this.diasDisponibles[4],this.diasDisponibles[5],this.diasDisponibles[6]);}
      
      this.router.navigate(["/perfil-usuario"]);
    }
    
  }

  async presentAlert(subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: "Alerta",
      subHeader: subtitulo,
      message: mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }

}
