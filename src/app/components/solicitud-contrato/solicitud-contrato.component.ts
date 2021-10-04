import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    }));
  } 


  aceptarContrato(idContrato:string){
    this.afs.collection('contratoPaseador').doc(idContrato)
    .update({estado:"aceptado"});
    this.afs.collection('paseador').doc(this.authServ.uid)
            .collection('disponibilidades').valueChanges()
            .subscribe((data)=>{
              console.log(data)

              this.afs.collection('contratoPaseador').doc(idContrato)
                      .collection('disponibilidades').doc(data[0].id)
                    
            })
   }
 
   rechazarContrato(idContrato:string){
     console.log(idContrato)
   }

}
