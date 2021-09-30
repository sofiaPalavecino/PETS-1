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
import { Cuidador } from '../shared/cuidador.interface';
import { mascota } from '../shared/mascota.interface';
import { PlanPaseo } from '../shared/plan-paseo.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public categorias:Array<string>=[];
  public paseador:Observable<Paseador>=null;
  public planesPaseador:Observable<Paseador>;
  public cuidador: Observable<Cuidador> = null;
  public planesCuidador:Observable<Cuidador> = null;


  public usuario:Observable<userProfile>;
  public id:any=0;

  constructor(private route: ActivatedRoute,private afs:AngularFirestore, private userServ:UserService, private aServ:AuthService,private obDataServ:ObtenerDataService) {
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.paseador=this.obDataServ.getTrabajador(this.id,"paseador")
    this.cuidador=this.obDataServ.getTrabajador(this.id,"cuidador")
    this.planesPaseador=this.obDataServ.getPlanes(this.id,"paseador")
    this.planesCuidador=this.obDataServ.getPlanes(this.id,"cuidador")
    this.usuario=this.afs.doc<userProfile>(`users/${this.id}`).valueChanges()
  }

}
