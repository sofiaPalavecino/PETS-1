import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  id:any

  constructor(private route: ActivatedRoute) { }

 async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id')
  }

}
