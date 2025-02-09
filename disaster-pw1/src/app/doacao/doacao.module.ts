import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';

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



@NgModule({
  declarations: [
    GerenciamentoComponent
  ],
  imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatBadgeModule,
        MatSelectModule,
        MatProgressBarModule 
  ],
  exports: [    
    GerenciamentoComponent
  ]
})
export class DoacaoModule { }
