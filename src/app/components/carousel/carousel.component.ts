import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let bk_img_i     :number = 1;
    let bk_imgs_count:number = document.getElementById("bk-imgs").getElementsByClassName('bk-img').length;

    let rotarFondoAuto = setInterval(cambiarFondo,0);

    function cambiarFondo() {
      document.getElementById("bk-img-" + bk_img_i).style.opacity = "0";
      
      if(bk_img_i == bk_imgs_count){
      bk_img_i = 1; 
      }else{
        bk_img_i++;
      }
      document.getElementById("bk-img-" + bk_img_i).style.opacity = "1";

      clearInterval(rotarFondoAuto);
      rotarFondoAuto = setInterval(cambiarFondo,5000);

    }
  }

}
