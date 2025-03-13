import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButton, MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    SidebarComponent,
    MenuComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    SidebarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCard,
    MatFormFieldModule,
    RouterLink,
    FormsModule,
    MatMenuTrigger,
    MatMenuModule, 
  ]
})
export class LayoutModule { }