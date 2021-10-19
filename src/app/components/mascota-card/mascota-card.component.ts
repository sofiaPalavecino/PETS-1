  import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
})
export class MascotaCardComponent implements OnInit {

  constructor(userServ:UserService) { }

  ngOnInit() {}

}
