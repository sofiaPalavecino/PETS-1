import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { userProfile } from 'src/app/shared/user.interface';
import { Observable, of, using } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ObtenerDataService } from '../services/obtener-data.service';
import { Paseador } from '../shared/paseador';
import { PlanCuidador } from '../shared/plan-cuidador.interface';
import { disponibilidades } from '../shared/disponibilidades.interface';
import { mascota } from '../shared/mascota.interface';
import { PlanPaseo } from '../shared/plan-paseo.interface';
import { Dia } from '../dia';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  uid:any
  pid:any

  planPaseo:Observable<PlanPaseo>=null;
  disponibilidades:Observable<disponibilidades[]>=null;
  usuario:Observable<userProfile>=null;
  diasDisponibles:Array<Dia>;
  
  constructor(private route: ActivatedRoute,private afs:AngularFirestore,private userServ:UserService ) {
    this.diasDisponibles = new Array<Dia>();
    this.diasDisponibles.push(new Dia("Lunes",false), new Dia("Martes",false), new Dia("Miercoles",false), new Dia("Jueves",false), new Dia("Viernes",false), new Dia("Sabado",false), new Dia("Domingo",false));
    console.log(this.diasDisponibles)
   }
  
  async ngOnInit() {
    
    this.uid = await this.route.snapshot.paramMap.get('uid')
    this.pid = await this.route.snapshot.paramMap.get('pid')

    this.usuario=this.afs.doc<userProfile>(`users/${this.uid}`).valueChanges()
    this.planPaseo = this.afs.doc<PlanPaseo>(`paseador/${this.uid}/planpaseador/${this.pid}/`).valueChanges()
    this.disponibilidades=this.afs.collection<disponibilidades>(`paseador/${this.uid}/planpaseador/${this.pid}/disponibilidades`).valueChanges()
    
  }
}
