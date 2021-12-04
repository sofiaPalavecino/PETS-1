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
import { UploadImageService } from '../services/upload-image.service';


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
  listImages: Array<any> = new Array<any>();

  constructor(private uploadImageService:UploadImageService,private especieServ:EspecieService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController, private org:OrganizacionService, private publiServ:PubliService) { }


  ngOnInit() {
  }

  
  deleteImage(index: any) {
    this.listImages.splice(index, 1);
    this.uploadImageService.files.splice(index, 1);
  }

  clickInputFile() {
    document.getElementById('inputImageProduct')!.click();
  }

  onFileSelected(event: any) {
    this.listImages.push(URL.createObjectURL(event.target.files[0]));
    this.uploadImageService.files.push(event.target.files[0]);
    console.log(this.listImages,this.uploadImageService.files);
  }


  subirPublicacion(){
    this.uploadImageService
    .uploadImages(this.nombre, 'productImages')
    .then(async (imageURL) => {
      this.listImages = imageURL;
      console.log(this.listImages);
      
      this.publiServ.nuevaPublicacion(this.nombre, this.especie, this.descripcion, this.cuidados, this.listImages);
    });
  }

}
