import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { PlanCuidador } from "../shared/plan-cuidador.interface";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-plan-cuidado",
  templateUrl: "./plan-cuidado.page.html",
  styleUrls: ["./plan-cuidado.page.scss"],
})
export class PlanCuidadoPage implements OnInit {
  costo: number;
  maximoMascotas: number;
  cantidadDias:number;
  idPlan:string;
  plan:Observable<PlanCuidador>;

  constructor(
    private userServ: UserService,
    public alertController: AlertController,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  async ngOnInit() {
    this.costo = 0;
    this.maximoMascotas = 0;
    this.cantidadDias=0;
    this.idPlan = await this.route.snapshot.paramMap.get("idPlan");
  }

  


  async checkValores(tipo,con2) {
    
    if(this.costo == 0 ||con2==0){
      this.presentAlert(
        "Datos incompletos",
        "Por favor, ingresar todos los datos"
      );
    }else{
      if(tipo=="update"){
        this.userServ.actualizarCuidado(this.costo,this.cantidadDias,this.idPlan)
      }else{this.userServ.crearNuevoCuidado(this.costo, this.maximoMascotas);}
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
