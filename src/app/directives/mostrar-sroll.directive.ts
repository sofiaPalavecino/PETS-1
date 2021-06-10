import { Directive,OnInit,Input,Renderer2, HostListener} from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
  selector: '[appMostrarSroll]'
})
export class MostrarSrollDirective implements OnInit{
  @Input("appMostrarSroll") toolbar:any;
  private toolbarHeight=44;


  constructor(private renderer: Renderer2 , private domCtrl: DomController) { }
    
    ngOnInit(){
      this.toolbar=this.toolbar.el;
      this.domCtrl.read(()=>{
        this.toolbarHeight=this.toolbar.clientHeight;
      });
    }

    @HostListener("ionscroll",["event"]) onContentScroll($event){
      const scrollTop= $event.detail.scrollTop;
    }

}
