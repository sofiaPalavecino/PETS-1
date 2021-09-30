import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlanPaseo } from '../shared/plan-paseo.interface';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  constructor(private route: ActivatedRoute,private afs:AngularFirestore) { }

  planPaseador:any;
  id:any;

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.planPaseador = this.afs.doc<PlanPaseo>(` /${this.id}`).valueChanges()
    console.log(this.id)
  }

}
