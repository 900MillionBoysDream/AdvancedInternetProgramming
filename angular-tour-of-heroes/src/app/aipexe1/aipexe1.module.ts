import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []

  isShow:boolean = false;

  answer:string = " ";
  btn:string = "See Answer";

  show(){
    
    if(!this.isShow){
      this.answer = "1+1 = 2";
      this.btn = "This is Answer";
      this.isShow = true;
    }
    else 
    {
      this.answer = "";
      this.btn = "See Answer";
      this.isShow = false;
    }
  }
})
export class Aipexe1Module { }
