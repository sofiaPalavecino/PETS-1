import { Component, OnInit , Input} from '@angular/core';
import { MascotaService } from '../services/mascota.service';
import { AuthService } from '../services/auth.service';
import { mascota } from '../shared/mascota.interface';

@Component({
  selector: 'app-contrato-card',
  templateUrl: './contrato-card.component.html',
  styleUrls: ['./contrato-card.component.scss'],
})
export class ContratoCardComponent implements OnInit {

  @Input() idContrato:string
  @Input() idMascota:string
  @Input() tipo:string
  

  idUsuario:string
  listaMascotas:Array<mascota>= []

  constructor(private masServ:MascotaService, private aServ:AuthService ) {
    this.aServ.afAuth.authState.subscribe((usuario)=>{
      this.idUsuario = usuario.uid
    })

    this.masServ.getMascota(this.idMascota,this.idUsuario).subscribe((a)=>{
      this.listaMascotas.push(a)
    })
    
  }

  ngOnInit() {
    console.log(this.idMascota);

    

    
    
  }

}
