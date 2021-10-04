import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private userServ: UserService,private obDataServ: ObtenerDataService) {
  }

  ngOnInit() {
    this.userServ.contratosPaseador.forEach(element => {
      if(element.docId == this.idContrato) this.contrato = element;
    });
    
    this.cliente = this.obDataServ.getUser(this.contrato.idCliente);

    this.cliente.subscribe(data => {
      this.userName = data.nombre + " " + data.apellido;
    })

  }

  aceptarContrato(){

  }

  rechazarContrato(){
    
  }

}
