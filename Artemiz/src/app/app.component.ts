import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';
import { GitComponent } from './git/git.component';

@Component({
  selector: 'app-root',
  imports: [
     RouterOutlet,
     LoginComponent,
     RegisterComponent,
     GitComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'artemiz';
}
