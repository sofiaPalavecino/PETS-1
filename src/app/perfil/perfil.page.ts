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
  public planesPaseador:Array<Observable<PlanPaseo>>=[];
  public cuidador: Observable<Cuidador> = null;
  public planesCuidador:Array<Observable<PlanCuidador>>=[];
  public mascotas:Array<Observable<mascota>>=[];

  public usuarios:Array<userProfile> = []
  public id:any=0;

  constructor(private route: ActivatedRoute,private afs:AngularFirestore, private userServ:UserService, private aServ:AuthService,private obDataServ:ObtenerDataService) {
    this.obDataServ.getTrabajador(this.id,"paseador")
    this.obDataServ.getTrabajador(this.id,"cuidador")
    this.obDataServ.getPlanes(this.id,"paseador")
    this.obDataServ.getPlanes(this.id,"cuidador")
    this.obDataServ.getMascotas(this.id)
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
    this.afs.firestore.collection("users").where("uid","==",this.id).get().then((querySnapshot)=>{
      if(querySnapshot.size>0){
        querySnapshot.forEach((doc) =>{
          let userAux:userProfile = {
            nombre: doc.data()["nombre"],
            apellido: doc.data()["apellido"],
            uid: doc.data()["uid"],
            email: doc.data()["email"],
            emailVerified: doc.data()["emailVerified"],
            nacimiento: doc.data()["nacimiento"],
            administrando:doc.data()["administrando"],
            DNI:doc.data()["DNI"],
            foto:doc.data()["foto"],
            barrio:doc.data()["barrio"]
          }
          this.usuarios.push(userAux);
        })
      } 
    })
  }

}
