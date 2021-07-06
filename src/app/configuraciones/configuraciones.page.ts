import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  constructor(private afs: AngularFirestore, private aServ:AuthService) {
    
  }

  ngOnInit() {}

  async cambiarDatos(nombre,apellido,email,nacimiento,dni){
    try{
      let uidUser:string;
      this.aServ.user$.subscribe((data)=>{
        uidUser=data.uid;
      })  //no se puede hacer value de undefine ¿?
      console.log(nombre);
      this.aServ.actualizarDatos(nombre.value,apellido.value,email.value,nacimiento.value,dni.value,uidUser);
    }
    catch (error) {
      console.log('Error', error);
    }
  }

}
