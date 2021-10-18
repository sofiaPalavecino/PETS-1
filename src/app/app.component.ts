import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import {ConectividadService} from './services/conectividad.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public alertController: AlertController

  constructor(private conectividad:ConectividadService,private aServ:AuthService,private router: Router,private alertCtrl: AlertController) {
    this.conectividad.appIsOnline$.subscribe(online => {

      console.log(online)
  
      if (online) {
  
        console.log("App is online")
  
      } else {
  
        console.log("App is offline")
  
      }
  
  })
    

  }
  

  
}
