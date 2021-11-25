import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContratoPaseador } from '../shared/contrato-paseador.interface';
import { userProfile } from '../shared/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mis-contratos',
  templateUrl: './mis-contratos.page.html',
  styleUrls: ['./mis-contratos.page.scss'],
})
export class MisContratosPage implements OnInit {

  public usuario:userProfile;
  public listContratosPaseador:Array<any> = new Array<any>();
  public listContratosCuidador:Array<any> = new Array<any>();
  public listaMascotas:Array<any> = new Array<any>();

  constructor(private aServ:AuthService,private afs:AngularFirestore) {
    this.aServ.user$.subscribe((data)=>{
      this.usuario=data;

      let contratosActivosMap: Map<string, string> = new Map(Object.entries(this.usuario.contratosActivos));
     
     
      let listContratosId = Object.keys(this.usuario.contratosActivos);

      listContratosId.forEach(contratoId => {
        let tipoContrato = contratosActivosMap.get(contratoId);
        console.log("idContr",contratoId)
        this.afs.doc<ContratoPaseador>("contrato" + tipoContrato + "/" + contratoId)
        .valueChanges({ idField: "idContrato" }).subscribe((contrato) => {
          if(tipoContrato == "Paseador") this.listContratosPaseador.push(contrato)
          else this.listContratosCuidador.push(contrato)
          console.log(this.listContratosPaseador);
          
        })
      });
    })
    console.log(this.listContratosCuidador);
    
  }

  ngOnInit() {
  }

}
