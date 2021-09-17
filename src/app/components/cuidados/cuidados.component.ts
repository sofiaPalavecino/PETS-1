import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.component.html',
  styleUrls: ['./cuidados.component.scss'],
})
export class CuidadosComponent implements OnInit {

  @Input() cuidadorId:any;

  constructor(private userServ:UserService) { }

  ngOnInit() {



  }

}
