import { Component, OnInit } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
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
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { moveMessagePortToContext } from "worker_threads";

@Component({
  selector: "app-reserva",
  templateUrl: "./reserva.page.html",
  styleUrls: ["./reserva.page.scss"],
})
export class ReservaPage implements OnInit {
  uid: any;
  pid: any;
  tipo:any;

  planPaseo: Observable<PlanPaseo> = null;
  planCuidado:Observable<PlanCuidador>=null;
  disponibilidades: Observable<disponibilidades[]>;
  usuario: Observable<userProfile> = null;
  diasDisponibles: Array<Dia>;
  mascotasCheck: Array<Dia>;
  cantidadDias:number;
  semana:Array<boolean> = new Array<boolean>();
  montoTotal:number;
  fecha:any="";
  minDate: string = new Date().toISOString();
  maxDate: string;

  constructor(
    private aServ: AuthService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private userServ: UserService,
    private date:DatePipe,
    public alertController: AlertController,
    private router: Router,
  ) {
    let añoActual = new Date();
    añoActual.setDate(añoActual.getDate()+183)
    this.maxDate = añoActual.toISOString();
  }

  async ngOnInit() {

   

    this.uid = await this.route.snapshot.paramMap.get("uid");
    this.pid = await this.route.snapshot.paramMap.get("pid");
    this.tipo=await this.route.snapshot.paramMap.get("tipo")

    this.usuario = this.afs
      .doc<userProfile>(`users/${this.uid}`)
      .valueChanges();

    if(this.tipo=="paseador"){
      this.planPaseo = this.afs
      .doc<PlanPaseo>(`paseador/${this.uid}/planpaseador/${this.pid}/`)
      .valueChanges();
      this.disponibilidades = this.afs
        .collection<disponibilidades>(
          `paseador/${this.uid}/planpaseador/${this.pid}/disponibilidades`
        )
        .valueChanges();
    }else{
      this.planCuidado =  this.afs
      .doc<PlanCuidador>(`cuidador/${this.uid}/plancuidador/${this.pid}`)
      .valueChanges();
    }
    

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

    
    console.log(this.tipo)
    if(this.tipo=="paseador"){
      this.planPaseo.subscribe((data) => {
      this.cantidadDias = data.cantidad_dias;
      this.montoTotal=data.costo;
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
    }else{
      this.planCuidado.subscribe((data) => {
        this.cantidadDias = data.cantidad_dias
        this.montoTotal=data.costo
      })
    }
    

    
    
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

    if(this.tipo == "paseador"){

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
  }

  reservar() {

    let cantMascotas:number = this.getCantMascotas();
    let cantDias:number = this.getCantDias();

    

    if(cantMascotas > 0){
      let mascotasId:Array<string> = new Array<string>();
      this.mascotasCheck.forEach(element => {
        if(element.estado == true) mascotasId.push(element.dataExtra)
      });
      let fecha = this.date.transform(new Date(), 'MM/dd/yyyy')
      if(this.tipo=="paseador"){
        if(cantDias > 0){
          let dias:Array<string> = new Array<string>();
          this.diasDisponibles.forEach(element => {
            if(element.estado == true) dias.push(element.nombre)
          });
          
          const nuevoContrato = this.afs.collection('contratoPaseador').add({
            cantMascotas:cantMascotas,
            estado:"solicitud",
            idCliente:this.aServ.uid,
            idMascota:mascotasId,
            idPaseador:this.uid,
            planContratado:this.pid,
            fechaContratacion:fecha,
            dias:dias,
            montoTotal:this.montoTotal
            
          })
          nuevoContrato.then((data)=> {
            console.log(`paseador/${this.uid}`)
            this.afs.doc(`paseador/${this.uid}`).update({
              solicitud_paseo: firebase.firestore.FieldValue.arrayUnion(data.id)
            })
          });
          this.router.navigate(['/home']);
          this.presentAlert("Listo!","Reserva relizada");
  
        } else {
          this.presentAlert("Datos Incompletos","Debes seleccionar al menos un día");
        }
      }else{
        if(this.fecha!=""){
          let fechaInicio=this.date.transform(this.fecha, 'MM/dd/yyyy')
          const nuevoContrato = this.afs.collection('contratoCuidador').add({
            cantMascotas:cantMascotas,
            estado:"solicitud",
            idCliente:this.aServ.uid,
            idMascota:mascotasId,
            idCuidador:this.uid,
            planContratado:this.pid,
            fechaInicio:fechaInicio,
            fechaContratacion:fecha,
            montoTotal:this.montoTotal,
            diasTotales:this.cantidadDias
          })
          nuevoContrato.then((data)=> {
            console.log(`cuidador/${this.uid}`)
            this.afs.doc(`cuidador/${this.uid}`).update({
              solicitud_cuidado: firebase.firestore.FieldValue.arrayUnion(data.id)
            })
          });
          this.router.navigate(['/home']);
          this.presentAlert("Listo!","Reserva relizada");
        }else{
          this.presentAlert("Datos Incompletos","Debes seleccionar el día de inicio del cuidado");
        }
        
      }
    } else {
      this.presentAlert("Datos Incompletos","Debes seleccionar al menos una de tus mascotas");
    }
    
    
  }
  async presentAlert(subtitulo:string,mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
