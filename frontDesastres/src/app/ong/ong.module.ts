import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { LayoutModule } from '../layout/layout.module';

import { OngManagerComponent } from './ong-manager/ong-manager.component';
import { OngListComponent } from './ong-list/ong-list.component';

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatBadge, MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from '@angular/material/select'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";



@NgModule({
  declarations: [
    OngManagerComponent,
    OngListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatProgressBarModule,
    MatMenuTrigger,
    MatMenuModule
    
  ],
  exports: [
    OngManagerComponent,
    OngListComponent
  ]
})
export class OngModule { }
