import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";


@Component({
  selector: 'app-combo-cuidador',
  templateUrl: './combo-cuidador.page.html',
  styleUrls: ['./combo-cuidador.page.scss'],
})
export class ComboCuidadorPage implements OnInit {

  cantidad_dias:number
  costo:number

  constructor(private userServ: UserService,public alertController: AlertController,private router: Router) { 
    
  }

  ngOnInit() {
    this.cantidad_dias=0
    this.costo=0
  }

  crearComboCuidado(){
    if(this.costo==0 || this.cantidad_dias==0){
      this.presentAlert("Datos incompletos","Por favor, ingresar todos los datos")
    }else{
      this.userServ.crearComboCuidador(this.costo,this.cantidad_dias);
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
