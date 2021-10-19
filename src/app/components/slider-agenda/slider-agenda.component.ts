import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-slider-agenda',
  templateUrl: './slider-agenda.component.html',
  styleUrls: ['./slider-agenda.component.scss'],
})
export class SliderAgendaComponent implements OnInit {

  public user:Observable<userProfile>

  constructor(private aServ:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.user=this.afs.doc<userProfile>(`users/${this.aServ.uid}`).valueChanges()
    console.log(this.user)

  }

}
