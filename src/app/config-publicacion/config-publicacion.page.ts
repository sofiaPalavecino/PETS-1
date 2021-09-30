import { Component, OnInit } from '@angular/core';
import { EspecieService } from '../services/especie.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { PubliService } from 'src/app/services/publi.service';
import { Publicacion } from 'src/app/shared/publicacion';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


@Component({
  selector: 'app-config-publicacion',
  templateUrl: './config-publicacion.page.html',
  styleUrls: ['./config-publicacion.page.scss'],
})
export class ConfigPublicacionPage implements OnInit {

  nombre:string;
  calificacion:number;
  especie:string;
  descripcion:string;
  cuidados:string;
  foto:string;

  constructor(private especieServ:EspecieService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController, private org:OrganizacionService, private publiServ:PubliService) { }


  ngOnInit() {
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

  subirPublicacion(){
    this.publiServ.nuevaPublicacion(this.nombre, this.especie, this.descripcion, this.cuidados);
  }

}
