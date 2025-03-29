import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';  


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
    { path: '', 
      redirectTo: '/login', 
      pathMatch: 'full' },

];
