import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ObtenerDataService } from "src/app/services/obtener-data.service";
import { UserService } from "src/app/services/user.service";
import { ContratoPaseador } from "src/app/shared/contrato-paseador.interface";
import { disponibilidades } from "src/app/shared/disponibilidades.interface";
import { userProfile } from "src/app/shared/user.interface";
import { OrganizacionService } from "src/app/services/organizacion.service";
import { OrganizacionesService } from "src/app/services/organizaciones.service";
import { ActivatedRoute } from '@angular/router';
import { PubliService } from "src/app/services/publi.service";
import { Publicacion } from "src/app/shared/publicacion";
import { Organizacion } from "src/app/shared/organizacion.interface"


import firebase from "firebase/app";
import "firebase/firestore";
import { mascota } from "../../shared/mascota.interface";
import { MapOperator } from "rxjs/internal/operators/map";
import { contratoTransito } from "src/app/shared/transito";

@Component({
  selector: "app-solicitud-contrato",
  templateUrl: "./solicitud-contrato.component.html",
  styleUrls: ["./solicitud-contrato.component.scss"],
})
export class SolicitudContratoComponent implements OnInit {
  public publicacion: Observable<Publicacion> = null
  public organizacion: Observable<Organizacion> = null
  public transito: Observable<contratoTransito> = null

  @Input() idContrato: string;
  @Input() tipo: string;
  @Input() idOrga: string;

  botonInfo: string = "ver mas";
  contrato: ContratoPaseador;
  userName: string;
  imgCliente: string;
  barrio: string;
  fecha: string;
  mascotas: Array<mascota[]>;
  contratosActivos = new Map();
  idCliente: string;
  cliente: Observable<userProfile> = new Observable<userProfile>();

  constructor(
    private authServ: AuthService,
    private afs: AngularFirestore,
    private userServ: UserService,
    private obDataServ: ObtenerDataService,
    private org: OrganizacionService,
    private orgas: OrganizacionesService,
    private route: ActivatedRoute,
    private publis: PubliService
  ) { }

  ngOnInit() {
    this.transito = this.publis.getTransito(this.idContrato)
    this.organizacion = this.orgas.getOrganizacion(this.idOrga)
    var id: any
    this.transito.subscribe((contrato) => {
      id = contrato.idAnimal
    })
    this.publicacion = this.publis.getPublicacion(id, this.idOrga)
    this.afs
      .doc<any>(`contrato${this.tipo}/${this.idContrato}`)
      .valueChanges({ idField: "docId" })
      .subscribe((data) => {
        this.contrato = data;
        this.idCliente = data.idCliente;
        this.cliente = this.obDataServ.getUser(data.idCliente);
        this.cliente.subscribe((data) => {
          this.userName = data.nombre + " " + data.apellido;
          this.imgCliente = data.foto;
          this.barrio = data.barrio;
          this.contratosActivos = data.contratosActivos;
          let mascotasUser = this.obDataServ.getMascotas(data.uid);
          mascotasUser.subscribe((mascotas) => {
            this.mascotas = new Array<mascota[]>();
            mascotas.forEach(mascota => {
              if (this.contrato.idMascota.includes(mascota.docId)) {
                this.mascotas.push(mascota);
              }
            });
            console.log(this.mascotas)
          })
        });
        if (this.tipo == "Paseador") {
          this.contrato.dias.forEach((element) => {
            document.getElementById(this.idContrato + element).style.background = "#7bd7b5";
          });
        }
      });
  }

  async aceptarContrato(idContrato: string) {
   
    document.getElementById(this.idContrato).style.transform =
      "translateX(-120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "aceptado" });
    if (this.tipo == "Transito") {
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          solicitud_transito: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
    }
    else if (this.tipo == "Paseador") {
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          solicitud_paseo: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
      let disponibilidades: any = await this.getDisponibilidades();

      this.contrato.dias.forEach((element) => {
        let cantMascotas: number = this.contrato.idMascota.length;
        switch (element) {
          case "Lunes":
            disponibilidades.Lunes = disponibilidades.Lunes - cantMascotas;
            break;
          case "Martes":
            disponibilidades.Martes = disponibilidades.Martes - cantMascotas;
            break;
          case "Miercoles":
            disponibilidades.Miercoles =
              disponibilidades.Miercoles - cantMascotas;
            break;
          case "Jueves":
            disponibilidades.Jueves = disponibilidades.Jueves - cantMascotas;
            break;
          case "Viernes":
            disponibilidades.Viernes = disponibilidades.Viernes - cantMascotas;
            break;
          case "Sabado":
            disponibilidades.Sabado = disponibilidades.Sabado - cantMascotas;
            break;
          case "Domingo":
            disponibilidades.Domingo = disponibilidades.Domingo - cantMascotas;
            break;
        }
      });
      console.log(disponibilidades);
      this.afs
        .doc(
          "paseador/" +
          this.authServ.uid +
          "/planpaseador/" +
          this.contrato.planContratado +
          "/disponibilidades/" +
          disponibilidades.docId
        )
        .update({
          Lunes: disponibilidades.Lunes,
          Martes: disponibilidades.Martes,
          Miercoles: disponibilidades.Miercoles,
          Jueves: disponibilidades.Jueves,
          Viernes: disponibilidades.Viernes,
          Sabado: disponibilidades.Sabado,
          Domingo: disponibilidades.Domingo,
        });

      let semana: Array<boolean> = new Array<boolean>();

      if (disponibilidades.Lunes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Martes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Miercoles <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Jueves <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Viernes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Sabado <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Domingo <= 0) semana.push(false);
      else semana.push(true);

      console.log(semana);

      this.afs
        .doc(
          "paseador/" +
          this.authServ.uid +
          "/planpaseador/" +
          this.contrato.planContratado
        )
        .update({
          lunes: semana[0],
          martes: semana[1],
          miercoles: semana[2],
          jueves: semana[3],
          viernes: semana[4],
          sabado: semana[5],
          domingo: semana[6],
        });
    } else {
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          solicitud_cuidado: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
    }

    let attr: string = "contratosActivos." + this.idContrato;
    this.afs.collection("users").doc(this.idCliente).update({
      [attr]: this.tipo
    })

    if (this.tipo == "Paseador") {

    }
  }

  async rechazarContrato(idContrato: string) {
    document.getElementById(this.idContrato).style.transform =
      "translateX(120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "rechazado" });


    if (this.tipo == "Transito") {
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          solicitud_transito: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
    }
    else if (this.tipo == "Paseador") {
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          solicitud_paseo: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
    }
    else {
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          solicitud_cuidado: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getDisponibilidades() {
    return await new Promise((resolve, reject) => {
      this.afs
        .collection<disponibilidades>(
          "paseador/" +
          this.authServ.uid +
          "/planpaseador/" +
          this.contrato.planContratado +
          "/disponibilidades"
        )
        .valueChanges({ idField: "docId" })
        .subscribe((data) => {
          resolve(data[0]);
        });
    }).then((res) => {
      return res;
    });
  }

  expandirSolicitud() {
    if (this.botonInfo == "ver mas") {
      document.getElementById(this.idContrato).style.height = "520px";
      this.botonInfo = "ver menos";
    } else {
      document.getElementById(this.idContrato).style.height = "65px";
      this.botonInfo = "ver mas";
    }
  }
}
