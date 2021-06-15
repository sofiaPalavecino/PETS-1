import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsconderSrollDirective } from './esconder-sroll.directive';
import { MostrarSrollDirective } from './mostrar-sroll.directive';



@NgModule({
  declarations: [
    EsconderSrollDirective,
    MostrarSrollDirective
  ],
  imports: [
    CommonModule 
  ],
  exports: [EsconderSrollDirective,MostrarSrollDirective]
})
export class DirectivesModule { }
