import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { userProfile } from "src/app/shared/user.interface";
import { Observable, of, using } from "rxjs";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { ObtenerDataService } from "../services/obtener-data.service";
import { Paseador } from "../shared/paseador";
import { PlanCuidador } from "../shared/plan-cuidador.interface";
import { disponibilidades } from "../shared/disponibilidades.interface";
import { mascota } from "../shared/mascota.interface";
import { PlanPaseo } from "../shared/plan-paseo.interface";
import { Dia } from "../dia";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-reserva",
  templateUrl: "./reserva.page.html",
  styleUrls: ["./reserva.page.scss"],
})
export class ReservaPage implements OnInit {
  uid: any;
  pid: any;

  planPaseo: Observable<PlanPaseo> = null;
  disponibilidades: Observable<disponibilidades[]> = null;
  usuario: Observable<userProfile> = null;
  diasDisponibles: Array<Dia>;
  mascotasCheck: Array<Dia>;
  cantidadDias:number;
  semana:Array<boolean> = new Array<boolean>();

  constructor(
    private aServ: AuthService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private userServ: UserService,
    private date:DatePipe
  ) {}

  async ngOnInit() {
    this.uid = await this.route.snapshot.paramMap.get("uid");
    this.pid = await this.route.snapshot.paramMap.get("pid");

    this.usuario = this.afs
      .doc<userProfile>(`users/${this.uid}`)
      .valueChanges();
    this.planPaseo = this.afs
      .doc<PlanPaseo>(`paseador/${this.uid}/planpaseador/${this.pid}/`)
      .valueChanges();
    this.disponibilidades = this.afs
      .collection<disponibilidades>(
        `paseador/${this.uid}/planpaseador/${this.pid}/disponibilidades`
      )
      .valueChanges();

    this.diasDisponibles = new Array<Dia>();
    this.diasDisponibles.push(
      new Dia("Lunes", false),
      new Dia("Martes", false),
      new Dia("Miercoles", false),
      new Dia("Jueves", false),
      new Dia("Viernes", false),
      new Dia("Sabado", false),
      new Dia("Domingo", false)
    );
    this.mascotasCheck = new Array<Dia>();
    this.userServ.mascotas.subscribe((data) => {
      data.forEach((element) => {
        this.mascotasCheck.push(new Dia(element.nombre, false));
        this.mascotasCheck[this.mascotasCheck.length-1].dataExtra = element.docId;
      });
    });
    this.planPaseo.subscribe((data) => {
      this.cantidadDias = data.cantidad_dias
      this.semana.push(
        data.lunes,
        data.martes,
        data.miercoles,
        data.jueves,
        data.viernes,
        data.sabado,
        data.domingo
      );
    })

    this.checkDisponibilidad();
    
  }

  getCantMascotas() {
    let cantMascotas:number = 0;

    this.mascotasCheck.forEach(element => {
      if(element.estado == true) cantMascotas++;
    });

    return cantMascotas;
  }

  getCantDias() {
    let cantDias:number = 0;

    this.diasDisponibles.forEach(element => {
      if(element.estado == true) cantDias++;
    });

    return cantDias;
  }

  checkDisponibilidad(){

    let cantMascotas:number = this.getCantMascotas();
    let cantDias:number = this.getCantDias();

    this.disponibilidades.subscribe((data) => {
      if (!this.semana[0] || data[0].Lunes - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[0].estado == false) {
        this.diasDisponibles[0].modificador = "disable";
        this.diasDisponibles[0].estado = false;
      } else this.diasDisponibles[0].modificador = "";
      if (!this.semana[1] || data[0].Martes - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[1].estado == false){
        this.diasDisponibles[1].modificador = "disable";
        this.diasDisponibles[1].estado = false;
      } else this.diasDisponibles[1].modificador = "";
      if (!this.semana[2] || data[0].Miercoles - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[2].estado == false){
        this.diasDisponibles[2].modificador = "disable";
        this.diasDisponibles[2].estado = false;
      } else this.diasDisponibles[2].modificador = "";
      if (!this.semana[3] || data[0].Jueves - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[3].estado == false){
        this.diasDisponibles[3].modificador = "disable";
        this.diasDisponibles[3].estado = false;
      } else this.diasDisponibles[3].modificador = "";
      if (!this.semana[4] || data[0].Viernes - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[4].estado == false){
        this.diasDisponibles[4].modificador = "disable";
        this.diasDisponibles[4].estado = false;
      } else this.diasDisponibles[4].modificador = "";
      if (!this.semana[5] || data[0].Sabado - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[5].estado == false){
        this.diasDisponibles[5].modificador = "disable";
        this.diasDisponibles[5].estado = false;
      } else this.diasDisponibles[5].modificador = "";
      if (!this.semana[6] || data[0].Domingo - cantMascotas < 0 || this.cantidadDias == cantDias && this.diasDisponibles[6].estado == false){
        this.diasDisponibles[6].modificador = "disable";
        this.diasDisponibles[6].estado = false;
      } else this.diasDisponibles[6].modificador = "";
    });
  }

  reservar() {

    let cantMascotas:number = this.getCantMascotas();
    let cantDias:number = this.getCantDias();

    if(cantMascotas > 0){
      if(cantDias > 0){

        let mascotasId:Array<string> = new Array<string>();
        let dias:Array<string> = new Array<string>();

        this.mascotasCheck.forEach(element => {
          if(element.estado == true) mascotasId.push(element.dataExtra)
        });

        this.diasDisponibles.forEach(element => {
          if(element.estado == true) dias.push(element.nombre)
        });

        let fecha = this.date.transform(new Date(), 'MM/dd/yyyy')

        const nuevoContrato = this.afs.collection('contratoPaseador').add({
          cantMascotas:cantMascotas,
          estado:"solicitud",
          idCliente:this.aServ.uid,
          idMascota:mascotasId,
          idPaseador:this.uid,
          planContratado:this.pid,
          fechaContratacion:fecha,
          dias:dias
        })

      } else {
        alert("debes seleccionar al menos un dia")
      }
    } else {
      alert("debes seleccionar al menos una de tus mascotas")
    }
    
    console.log(this.diasDisponibles, this.mascotasCheck);
  }
}
