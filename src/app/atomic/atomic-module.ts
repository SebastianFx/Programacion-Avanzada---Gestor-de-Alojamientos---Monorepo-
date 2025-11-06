import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './atoms/button/button';
import { Input } from './atoms/input/input';
import { Label } from './atoms/label/label';



@NgModule({
  declarations: [
    Button,
    Input,
    Label
  ],
  imports: [
    CommonModule
  ]
})
export class AtomicModule { }
