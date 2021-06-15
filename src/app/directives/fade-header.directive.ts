import { Directive, OnInit,Input,Renderer2,HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
  selector: '[appFadeHeader]'
})
export class FadeHeaderDirective {

  @Input('appFadeHeader') toolbar: any;
  constructor( private domContrl: DomController) { 

  }
  ngOnInit(){
    this.toolbar=this.toolbar.el;
  }

  @HostListener('ionscroll',['$event']) onContentScroll($event){
    let scrollTop= $event.detail.scrollTop;
    if(scrollTop >=225){
      scrollTop =225;
    }
    const hexDist= scrollTop.toString(16);

    this.domContrl.write(()=>{
      this.toolbar.style.setProperty('--background',`#f4f5f8${hexDist}`);
    })
  }

}
