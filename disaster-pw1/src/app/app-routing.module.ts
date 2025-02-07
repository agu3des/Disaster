import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from "./desastre/listagem/listagem.component";
import { ManutencaoComponent } from "./desastre/manutencao/manutencao.component";

export const routes: Routes = [
    {
    path: 'app-listagem',
    component: ListagemComponent
    },
    {
    path: 'app-manutencao',
    component: ManutencaoComponent
    },
    {
    path: 'app-manutencao/:id',
    component: ManutencaoComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

