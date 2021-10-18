import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { getDatabase, ref, onDisconnect } from "firebase/database";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  public alertController: AlertController

  constructor(private aServ:AuthService,private router: Router,private network: Network, private platform: Platform,private alertCtrl: AlertController) {
    const db = getDatabase();
    const presenceRef = ref(db, "disconnectmessage");
    // Write a string when this client loses connection
    onDisconnect(presenceRef).set("I disconnected!");

  }

  

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: "conexión",
      message: "conexión",
      buttons: ['OK']
    });
  }
}
