import { Component, OnInit } from '@angular/core';
import { EspecieService } from '../services/especie.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { UploadImageService } from '../services/upload-image.service';

@Component({
  selector: 'app-config-mascota',
  templateUrl: './config-mascota.page.html',
  styleUrls: ['./config-mascota.page.scss'],
})
export class ConfigMascotaPage implements OnInit {

  nombre:string;
  especieMascota:string;
  descripcion:string;
  cuidado:string;
  listImages: Array<any> = new Array<any>();


  constructor(private uploadImageService:UploadImageService ,private especieServ:EspecieService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController, public uServ:UserService) { 

      this.nombre;
      this.especieMascota;
      this.descripcion;
      this.cuidado;

  }

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

  subidaAnimal(){
    this.uploadImageService
    .uploadImages(this.nombre, 'productImages')
    .then(async (imageURL) => {
      this.listImages = imageURL;
      console.log(this.listImages);
      
      this.uServ.crearMascota(this.nombre,this.especieMascota,this.descripcion,this.cuidado,this.listImages);
    });    
  }

  
}
