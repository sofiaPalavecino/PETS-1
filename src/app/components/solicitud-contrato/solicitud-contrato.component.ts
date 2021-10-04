import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ObtenerDataService } from 'src/app/services/obtener-data.service';
import { UserService } from 'src/app/services/user.service';
import { ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';
import { disponibilidades } from 'src/app/shared/disponibilidades.interface';
import { userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-solicitud-contrato',
  templateUrl: './solicitud-contrato.component.html',
  styleUrls: ['./solicitud-contrato.component.scss'],
})
export class SolicitudContratoComponent implements OnInit {

  @Input() idContrato:string;

  show:boolean = true;
  contrato:ContratoPaseador;
  userName:string;
  mascotas:Array<string> = new Array<string>();
  cliente:Observable<userProfile>;

  constructor(private authServ:AuthService,private afs: AngularFirestore,private userServ: UserService,private obDataServ: ObtenerDataService) {
  }

  ngOnInit() {

    this.afs.doc<ContratoPaseador>(`contratoPaseador/${this.idContrato}`)
    .valueChanges({idField:"docId"}).subscribe((data=>{
      this.contrato = data;
      this.cliente = this.obDataServ.getUser(data.idCliente);
      this.cliente.subscribe(data => {
        this.userName = data.nombre + " " + data.apellido;
      })
      if(this.contrato.estado != "solicitud"){
        this.show = false;
      }
    }));
  } 

  async aceptarContrato(idContrato:string){
    this.afs.collection('contratoPaseador').doc(idContrato)
    .update({estado:"aceptado"});
    
    let disponibilidades:any = await this.getDisponibilidades()

    this.contrato.dias.forEach(element => {
      let cantMascotas:number = this.contrato.idMascota.length;
      switch (element) {
        case "Lunes":
          disponibilidades.Lunes = disponibilidades.Lunes - cantMascotas;
          break;
        case "Martes":
          disponibilidades.Martes = disponibilidades.Martes - cantMascotas;
          break;
        case "Miercoles":
          disponibilidades.Miercoles = disponibilidades.Miercoles - cantMascotas;
          break;
        case "Lunes":
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
    console.log(disponibilidades)
    this.afs.doc("paseador/"+this.authServ.uid+"/planpaseador/"+this.contrato.planContratado+"/disponibilidades/"+disponibilidades.docId)
    .update({
      Lunes:disponibilidades.Lunes,
      Martes:disponibilidades.Martes,
      Miercoles:disponibilidades.Miercoles,
      Jueves:disponibilidades.Jueves,
      Viernes:disponibilidades.Viernes,
      Sabado:disponibilidades.Sabado,
      Domingo:disponibilidades.Domingo
    })

    let semana:Array<boolean> = new Array<boolean>();

    if(disponibilidades.Lunes <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Martes <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Miercoles <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Jueves <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Viernes <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Sabado <= 0) semana.push(false);
    else semana.push(true)
    if(disponibilidades.Domingo <= 0) semana.push(false);
    else semana.push(true)
  
    console.log(semana)

    this.afs.doc("paseador/"+this.authServ.uid+"/planpaseador/"+this.contrato.planContratado)
    .update({
      lunes:semana[0],
      martes:semana[1],
      miercoles:semana[2],
      jueves:semana[3],
      viernes:semana[4],
      sabado:semana[5],
      domingo:semana[6]
    })
   }
 
   rechazarContrato(idContrato:string){
     console.log(idContrato)
   }

   async getDisponibilidades(){
    return await new Promise((resolve, reject) => {
      this.afs.collection<disponibilidades>("paseador/"+this.authServ.uid+"/planpaseador/"+this.contrato.planContratado+"/disponibilidades")
      .valueChanges({idField:"docId"})
      .subscribe((data)=>{
        resolve(data[0]);
      })
    }).then((res) => {
      return res;
    })
   }

   

}
