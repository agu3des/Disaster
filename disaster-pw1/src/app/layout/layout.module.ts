import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';

import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { RouterLink } from "@angular/router";

import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
      MenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuTrigger,
    MatMenuModule,
    MatCard,
    MatFormFieldModule,
    RouterLink
  ]
})
export class LayoutModule { }