import { Injectable, Query } from "@angular/core";
import { User } from "../shared/user.interface";
import { Paseador } from "../shared/paseador";
import { Cuidador } from "../shared/cuidador.interface";
import { mascota } from "../shared/mascota.interface";
import { PlanPaseo } from "../shared/plan-paseo.interface";
import { PlanCuidador } from "../shared/plan-cuidador.interface";

import firebase from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of, using } from "rxjs";
import { switchMap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { ConfigMascotaPageModule } from "../config-mascota/config-mascota.module";
import { identifierModuleUrl } from "@angular/compiler";
import { Dia } from "../dia";

import { element } from "protractor";

import { newArray } from "@angular/compiler/src/util";
import { ObtenerDataService } from "./obtener-data.service";
import { ContratoPaseador } from "../shared/contrato-paseador.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public categorias: Array<string> = [];
  public paseador: Observable<Paseador> = new Observable<Paseador>();
  public planesPaseador: Observable<Paseador> = new Observable<Paseador>();
  public cuidador: Observable<Cuidador> = new Observable<Cuidador>();
  public planesCuidador: Observable<Cuidador> = new Observable<Cuidador>();
  public mascotas: Observable<mascota[]> = new Observable<mascota[]>();
  public contratosPaseador: ContratoPaseador[] = [];

  constructor(
    private afs: AngularFirestore,
    private authSvc: AuthService,
    private obDataServ: ObtenerDataService
  ) {
    console.log(authSvc.uid);
    this.paseador = this.obDataServ.getTrabajador(this.authSvc.uid, "paseador");
    this.cuidador = this.obDataServ.getTrabajador(this.authSvc.uid, "cuidador");
    this.planesPaseador = this.obDataServ.getPlanes(
      this.authSvc.uid,
      "paseador"
    );
    this.planesCuidador = this.obDataServ.getPlanes(
      this.authSvc.uid,
      "cuidador"
    );
    this.mascotas = this.obDataServ.getMascotas(this.authSvc.uid);
    this.obDataServ
      .getContratos(this.authSvc.uid, "Paseador")
      .then((result) => {
        this.contratosPaseador = result;
      });
  }

  async crearNuevoPaseo(
    costoA: number,
    cupoA: number,
    plazoA: string,
    cantDiasPaseoA: number,
    disponibilidadA: boolean,
    estadoA: string,
    lunes: Dia,
    martes: Dia,
    miercoles: Dia,
    jueves: Dia,
    viernes: Dia,
    sabado: Dia,
    domingo: Dia
  ) {
    this.obDataServ
      .checkTrabajador(this.authSvc.uid, "paseador")
      .toPromise()
      .then((paseadorLolazo) => {
        if (!paseadorLolazo.exists) {
          //si paseador=false, no existe documento de paseador para el usuario

          this.afs.collection("paseador").doc(this.authSvc.uid).set({
            calificacion_promedio: 0,
          });

          this.paseador = this.obDataServ.getTrabajador(
            this.authSvc.uid,
            "paseador"
          );
        }

        cupoA = Number(cupoA);
        cantDiasPaseoA = Number(cantDiasPaseoA);

        console.log(typeof cupoA);

        const creoPlan = this.afs
          .collection("paseador")
          .doc(this.authSvc.uid)
          .collection("planpaseador")
          .add({
            costo: costoA,
            cupo: cupoA,
            plazo: plazoA,
            cantidad_dias: cantDiasPaseoA,
            disponibilidad: disponibilidadA,
            estado: estadoA,
            lunes: lunes.estado,
            martes: martes.estado,
            miercoles: miercoles.estado,
            jueves: jueves.estado,
            viernes: viernes.estado,
            sabado: sabado.estado,
            domingo: domingo.estado,
          });

        creoPlan.then((data) => {
          this.afs
            .collection("paseador")
            .doc(this.authSvc.uid)
            .collection("planpaseador")
            .doc(data.id)
            .collection("disponibilidades")
            .add({
              Lunes: cupoA,
              Martes: cupoA,
              Miercoles: cupoA,
              Jueves: cupoA,
              Viernes: cupoA,
              Sabado: cupoA,
              Domingo: cupoA,
            });
        });
      });
  }

  async crearNuevoCuidado(costoA: number, cupoA: number) {
    this.obDataServ
      .checkTrabajador(this.authSvc.uid, "cuidador")
      .toPromise()
      .then((cuidadorLolazo) => {
        if (!cuidadorLolazo.exists) {
          //si paseador=false, no existe documento de paseador para el usuario

          this.afs.collection("cuidador").doc(this.authSvc.uid).set({
            calificacion_promedio: 0,
            precio_dia: costoA,
            maximoMascotas: cupoA,
            disponibilidad: true,
            cupo: cupoA,
          });

          this.paseador = this.obDataServ.getTrabajador(
            this.authSvc.uid,
            "cuidador"
          );
        } else {
          const actualizoCuidado = this.afs
            .collection("cuidador")
            .doc(this.authSvc.uid)
            .update({
              precio_dia: costoA,
              maximoMascotas: cupoA,
              cupo: cupoA,
            });
        }
      });

    /*if(this.cuidador==undefined){

      const creoCuidador = await this.afs.collection('cuidador').add({
        calificacion_promedio: 0, 
        idUsuario: this.authSvc.uid,
        precio_dia:costoA,
        maximoMascotas:cupoA,
        disponibilidad:true,
        cupo:0
      })
      this.cuidador=this.afs.doc<Cuidador>(`cuidador/${creoCuidador.id}`).valueChanges();

    }
    else{
      this.cuidador.subscribe(val=>{
        this.afs.firestore.collection('cuidador').where('idUsuario',"==",val.idUsuario).get().then(async (querySnapshot)=>{
          if(querySnapshot.size>0){
  
            querySnapshot.forEach(docP=>{
              const actualizoCuidado = this.afs.collection('cuidador').doc(docP.id).update({
                precio_dia:costoA,
                maximoMascotas:cupoA,
                calificacion_promedio: val.calificacion_promedio,
                cupo:val.cupo,
                disponibilidad:val.disponibilidad,
                idUsuario:val.idUsuario
              })
            })  
          }
         })
       });
    }*/
  }

  async crearComboCuidador(costoA: number, cantidad_diasA: number) {
    const creoPlan = this.afs
      .collection("cuidador")
      .doc(this.authSvc.uid)
      .collection("plancuidador")
      .add({
        cantidad_dias: cantidad_diasA,
        costo: costoA,
      });

    /*this.cuidador.subscribe(val =>{
      this.afs.firestore.collection('cuidador').where('idUsuario',"==",val.idUsuario).get().then((querySnapshot)=>{
        if(querySnapshot.size>0){
          querySnapshot.forEach(docP =>{
            const creoPlan =  this.afs.collection('cuidador').doc(docP.id).collection('plancuidador').add({ 
              cantidad_dias:cantidad_diasA,
              costo:costoA
            })
            //this.ofertasCuidador$.push(creoPlan);
          })
        }
      })
    })*/
  }
}
