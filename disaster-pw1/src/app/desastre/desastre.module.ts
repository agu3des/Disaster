import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManutencaoComponent } from './manutencao/manutencao.component';
import { ListagemComponent } from './listagem/listagem.component';

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatBadge, MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from '@angular/material/select'; // Para seleções





@NgModule({
  declarations: [
    ManutencaoComponent,
    ListagemComponent
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
    MatSelectModule
  ],
  exports: [    
    ManutencaoComponent,
    ListagemComponent
  ]
})
export class DesastreModule { 


}
