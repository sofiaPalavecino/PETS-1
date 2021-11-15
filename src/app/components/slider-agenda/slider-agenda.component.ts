import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoCuidador, ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';

@Component({
  selector: 'app-slider-agenda',
  templateUrl: './slider-agenda.component.html',
  styleUrls: ['./slider-agenda.component.scss'],
})
export class SliderAgendaComponent implements OnInit {

  public contratosPendientes:boolean;
  public paseos:ContratoPaseador;
  public cuidados:ContratoCuidador;
  
  constructor(private aServ:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.revisarContratos()
  }

  ionViewDidEnter(){
    this.revisarContratos()
  }

  revisarContratos(){
    this.contratosPendientes=false;
    
    /*if(this.aServ.user$.contratosActivos.size>0){
      
        for (let [key, value] of this.aServ.user$.contratosActivos) {
            console.log(key, value);            //"Lokesh" 37 "Raj" 35 "John" 40
        }
    }*/
  }

}