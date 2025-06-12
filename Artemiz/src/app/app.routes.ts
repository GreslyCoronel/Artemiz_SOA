import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';  
import { TuPerfilComponent } from './tu-perfil/tu-perfil.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: 'login',
        title: 'login',
        component: LoginComponent
    },
    {
        path:'registro',
        title:'registro',
        component: RegisterComponent
    },
    {  path: '', 
       redirectTo: '/login', 
       pathMatch: 'full' },
    { 
        path: 'tuPerfil', 
        component: TuPerfilComponent 
    },
    {
        path:'cambiarPassword',
        title:'CambiarPassword',
        component: CambiarPasswordComponent
    },
    {
        path:'home',
        title:'home',
        component: HomeComponent
    },
    {
        path:'header',
        title:'header',
        component: HeaderComponent
    },
    {
        path:'filtrar',
        title:'filtrar',
        component: FiltrarComponent,
        canActivate: [authGuard]
    }
];
