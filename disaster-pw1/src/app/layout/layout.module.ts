import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';

import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { RouterLink } from "@angular/router";

import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    SidebarComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuTrigger,
    MatMenuModule,
    MatCard,
    MatFormFieldModule,
    RouterLink,
    FormsModule
  ]
})
export class LayoutModule { }