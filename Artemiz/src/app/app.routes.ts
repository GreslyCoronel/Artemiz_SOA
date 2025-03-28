import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    {
        path: '',
        title: 'login',
        component: LoginComponent
    },
    {
        path:'registro',
        title:'registro',
        component: RegistroComponent
    }

];
