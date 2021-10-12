import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizacionesService } from 'src/app/services/organizaciones.service';
import { Organizacion } from 'src/app/shared/organizacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { userProfile } from 'src/app/shared/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-sector-publis-orga',
  templateUrl: './sector-publis-orga.component.html',
  styleUrls: ['./sector-publis-orga.component.scss'],
})
export class SectorPublisOrgaComponent implements OnInit {

  //@Input() orgaID:string
  public user:Observable<userProfile>

  constructor(private orgServ:OrganizacionesService, private aServ:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.user=this.afs.doc<userProfile>(`users/${this.aServ.uid}`).valueChanges()
    console.log(this.user)

  }

}
