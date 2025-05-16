import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';  
import { TuPerfilComponent } from './tu-perfil/tu-perfil.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';


export const routes: Routes = [
    {
        path: '',
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
        component: TuPerfilComponent },
    {
        path:'cambiarPassword',
        title:'CambiarPassword',
        component: CambiarPasswordComponent
    }



];
