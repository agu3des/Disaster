import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListagemComponent } from "./desastre/listagem/listagem.component";
import { ManutencaoComponent } from "./desastre/manutencao/manutencao.component";

import { VolunteerManagerComponent } from './volunteer/volunteer-manager/volunteer-manager.component';
import { VolunteerListComponent } from './volunteer/volunteer-list/volunteer-list.component';

import { HomePageComponent } from './home/home-page/home-page.component';
import { OriginComponent } from './home/origin/origin.component';
import { OngsComponent } from './home/ongs/ongs.component';

import { LoginModalComponent } from './layout/login/login.component';
import { MenuComponent } from './layout/menu/menu.component';

export const routes: Routes = [
    { 
        path: '', redirectTo: '/app-home-page', pathMatch: 'full' 
    },
    {
        path: 'app-menu',
        component: MenuComponent
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
        path: 'app-ongs',
        component: OngsComponent
    }, 
    {
        path: 'app-home-page',
        component: HomePageComponent
    },
    {
        path: 'app-login',
        component: LoginModalComponent
    },
    {
        path: 'app-volunteer-manager',
        component: VolunteerManagerComponent
    },
    {
        path: 'app-volunteer-list',
        component: VolunteerListComponent
    },
    {
        path: 'edit-volunteer/:id',
        component: VolunteerManagerComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

