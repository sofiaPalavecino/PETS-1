import { Component, OnInit , Input} from '@angular/core';
import { MascotaService } from '../services/mascota.service';
import { AuthService } from '../services/auth.service';
import { mascota } from '../shared/mascota.interface';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-contrato-card',
  templateUrl: './contrato-card.component.html',
  styleUrls: ['./contrato-card.component.scss'],
})
export class ContratoCardComponent implements OnInit {

  @Input() idContrato:string
  @Input() idMascotas:any
  @Input() tipo:string
  

  idUsuario:string
  listaMascotas:Array<mascota>

  constructor(private masServ:MascotaService, private aServ:AuthService ) {
    this.aServ.afAuth.authState.subscribe((usuario)=>{
      this.idUsuario = usuario.uid
      
      this.listaMascotas = this.masServ.getMascotas(this.idMascotas,this.idUsuario)
    })
  }

  ngOnInit() {
    console.log(this.idMascotas);
  }

  pasarId(idMascotas:Array<string>){
    this.masServ.idMascotas=idMascotas;
    return true;
  }

}
