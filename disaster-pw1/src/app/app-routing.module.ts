import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListagemComponent } from "./desastre/listagem/listagem.component";
import { ManutencaoComponent } from "./desastre/manutencao/manutencao.component";

import { HomePageComponent } from './home/home-page/home-page.component';
import { OriginComponent } from './home/origin/origin.component';
import { LoginModalComponent } from './layout/login/login.component';

export const routes: Routes = [
    { 
        path: '', redirectTo: '/app-home-page', pathMatch: 'full' 
    },
    {
        path: 'listagem-desastres',
        component: ListagemComponent
    },
    {
        path: 'cadastro-desastre',
        component: ManutencaoComponent
    },
    {
        path: 'edicao-desastre/:id',
        component: ManutencaoComponent
    },
    {
        path: 'app-origin',
        component: OriginComponent
    },    
    {
        path: 'app-home-page',
        component: HomePageComponent
    },
    {
        path: 'app-login',
        component: LoginModalComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

