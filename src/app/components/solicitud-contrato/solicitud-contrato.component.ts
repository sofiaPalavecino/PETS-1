import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitud-contrato',
  templateUrl: './solicitud-contrato.component.html',
  styleUrls: ['./solicitud-contrato.component.scss'],
})
export class SolicitudContratoComponent implements OnInit {

  @Input() idContrato:string;

  constructor() { }

  ngOnInit() {
    console.log(this.idContrato);
  }

}
