import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';


// import { ImagePicker } from '@ionic-native/image-picker/ngx';



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
  administrando:string;
  
  // private imagePicker: ImagePicker
  constructor(private afs: AngularFirestore, private aServ:AuthService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController,) {
    this.aServ.user$.subscribe((data)=>{
      this.nombre=data.nombre;
      this.apellido=data.apellido;
      this.DNI=data.DNI;
      this.correo=data.email;
      this.fechaNacimiento=data.nacimiento;
      this.uid=data.uid;
      this.administrando=data.administrando;
    })  
  }

  ngOnInit() {}

  async cambiarDatos(){
    this.aServ.actualizarDatos(this.nombre,this.apellido,this.correo,this.fechaNacimiento,this.DNI,this.uid,this.administrando);
  }


  pickImage(sourceType) {
    const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    }
     this.camera.getPicture(options).then((imageData) => { //imageData lo que tengo que subir a firebase
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }






}

    
