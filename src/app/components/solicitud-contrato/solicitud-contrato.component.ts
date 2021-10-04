import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ObtenerDataService } from 'src/app/services/obtener-data.service';
import { UserService } from 'src/app/services/user.service';
import { ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';
import { userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-solicitud-contrato',
  templateUrl: './solicitud-contrato.component.html',
  styleUrls: ['./solicitud-contrato.component.scss'],
})
export class SolicitudContratoComponent implements OnInit {

  @Input() idContrato:string;

  contrato:ContratoPaseador;
  userName:string;
  mascotas:Array<string> = new Array<string>();
  cliente:Observable<userProfile>;

  constructor(private afs: AngularFirestore,private userServ: UserService,private obDataServ: ObtenerDataService) {
  }

  ngOnInit() {

    console.log(this.idContrato)
    this.afs.doc<ContratoPaseador>(`contratoPaseador/${this.idContrato}`)
    .valueChanges({idField:"docId"}).subscribe((data=>{
      this.contrato = data;
      this.cliente = this.obDataServ.getUser(data.idCliente);
      this.cliente.subscribe(data => {
        this.userName = data.nombre + " " + data.apellido;
      })
    }));
  } 

}
