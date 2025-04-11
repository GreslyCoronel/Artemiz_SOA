import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-facebook',
  standalone: true,
  imports: [],
  templateUrl: './facebook.component.html',
  styleUrl: './facebook.component.css'
})
export class FacebookComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  loginFacebook() {
    this.authService.loginWithFacebook()
      .then(result => {
        console.log('✅ Autenticado con Facebook:', result.user);
        alert("Inicio de sesión con Facebook exitoso!");
      })
      .catch(error => {
        console.error('❌ Error con Facebook Login:', error);
        this.errorMessage = '⚠️ Error al iniciar sesión con Facebook';
      });
  }
}

