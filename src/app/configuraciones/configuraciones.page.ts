import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {
  
  nombre:string;
  apellido:string;
  DNI:Number;
  correo:string;
  fechaNacimiento:string;
  uid:string;

  constructor(private afs: AngularFirestore, private aServ:AuthService,private imagePicker: ImagePicker) {
    this.aServ.user$.subscribe((data)=>{
      this.nombre=data.nombre;
      this.apellido=data.apellido;
      this.DNI=data.DNI;
      this.correo=data.email;
      this.fechaNacimiento=data.nacimiento;
      this.uid=data.uid;
    })  
  }

  ngOnInit() {}

  async cambiarDatos(){
    this.aServ.actualizarDatos(this.nombre,this.apellido,this.correo,this.fechaNacimiento,this.DNI,this.uid);
  }

  getPic(){
   


  }
  
}
