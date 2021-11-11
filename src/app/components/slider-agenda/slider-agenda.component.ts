import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoCuidador, ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';
import { User, userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-slider-agenda',
  templateUrl: './slider-agenda.component.html',
  styleUrls: ['./slider-agenda.component.scss'],
})
export class SliderAgendaComponent implements OnInit {
  
  public usuario:userProfile;

  constructor(private aServ:AuthService, private afs:AngularFirestore) { 
    this.aServ.user$.subscribe((usuario2)=>{
      this.usuario=usuario2;
     
    })
  }

  ngOnInit() {
  }
  
}