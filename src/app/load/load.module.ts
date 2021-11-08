import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { time } from 'console';
import { of } from 'rxjs';
import { Router } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoadModule implements OnInit{  

  constructor(private authServ:AuthService, private router: Router){
    of(this.authServ.uid).subscribe(val=>{
      if(val.length>0){
        console.log(val)
        this.router.navigateByUrl(`/home`);
      }
    })
    

  }

  ngOnInit(){
    
  }
}
