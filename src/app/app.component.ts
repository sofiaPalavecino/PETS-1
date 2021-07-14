import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private aServ:AuthService,private router: Router) {
    aServ.user$.subscribe((data: any) => {
      if(data == null){
        router.navigate(['/login']);
      }else{
        router.navigate(['/home']);
      }
    })
  }
}
