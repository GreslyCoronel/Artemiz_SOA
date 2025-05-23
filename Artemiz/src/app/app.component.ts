import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';
import { GitComponent } from './git/git.component';
import { TuPerfilComponent } from './tu-perfil/tu-perfil.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  imports: [
     RouterOutlet,
     LoginComponent,
     RegisterComponent,
     GitComponent,
     TuPerfilComponent,
     CambiarPasswordComponent,
     HomeComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'artemiz';
}
