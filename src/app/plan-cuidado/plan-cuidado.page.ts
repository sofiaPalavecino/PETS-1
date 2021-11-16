import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-plan-cuidado',
  templateUrl: './plan-cuidado.page.html',
  styleUrls: ['./plan-cuidado.page.scss'],
})
export class PlanCuidadoPage implements OnInit {

  costo:number;
  maximoMascotas:number;

  constructor(private userServ: UserService,public alertController: AlertController,private router: Router) { 
    
    
  }

  ngOnInit() {
    this.costo=0;
    this.maximoMascotas=0;
  }

  async crearCuidado(){
    console.log(this.costo,this.maximoMascotas);
    
    if(this.costo==0 || this.maximoMascotas==0){
      this.presentAlert("Datos incompletos","Por favor, ingresar todos los datos")
    }else{
      this.userServ.crearNuevoCuidado(this.costo,this.maximoMascotas);
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
