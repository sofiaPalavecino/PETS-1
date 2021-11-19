import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  downloadURL: Observable<string> = new Observable();
  files: Array<any> = new Array<any>();

  uploadImages(name:string,collection:string):Promise<any> {
    let filePromises:Array<any> = new Array<any>();

    this.files.forEach((file) => {
      let filePromise = this.uploadImage(name, file, collection);
      filePromises.push(filePromise);
    })

    return Promise.all(filePromises)
  }

  uploadImage(name:string, file:any,collection:any):Promise<string> {
    return new Promise((resolve, reject) => {

      const nombreArchivo = name + Date.now();
      const filePath = collection+`/${nombreArchivo}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(collection+`/${nombreArchivo}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((url) => {
              if (url) {
                this.downloadURL = new Observable<string>(); 
                resolve(url);     
              }
            });
          })
        )
        .subscribe();
    })
  }

  deleteImage(downloadUrl:any) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}