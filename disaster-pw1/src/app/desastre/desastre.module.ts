import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { ListagemComponent } from './listagem/listagem.component';



@NgModule({
  declarations: [
    ManutencaoComponent,
    ListagemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    ManutencaoComponent,
    ListagemComponent
  ]
})
export class DesastreModule { 


}
