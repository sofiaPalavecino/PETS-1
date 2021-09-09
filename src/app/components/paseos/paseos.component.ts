import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-paseos',
  templateUrl: './paseos.component.html',
  styleUrls: ['./paseos.component.scss'],
})
export class PaseosComponent implements OnInit {
  @Input() paseadorId:any;

  constructor(private userServ:UserService) { }

  ngOnInit() {

  }

}
