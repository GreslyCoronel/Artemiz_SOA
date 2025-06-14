import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { GitComponent } from '../git/git.component';
import { FacebookComponent } from '../facebook/facebook.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosAuthService } from '../services/usuarios-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, GitComponent, FacebookComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private usuariosService: UsuariosService,  private usuariosAuthService: UsuariosAuthService) {}

  async login() {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = "⚠️ Todos los campos son obligatorios";
      return;
    }

    this.email = this.email.trim().toLowerCase();
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "⚠️ El correo electrónico no es válido";
      return;
    }

    try {
      const userCredential = await this.authService.login(this.email, this.password);
      const user = userCredential.user;

      this.authService.getUserDataFromBackend().subscribe(async userData => {
      if (userData) {
        await this.usuariosAuthService.guardarUsuarioEnFirestore({
          firebaseUID: user.uid,
          nombre: userData.nombre || '',
          apellido: userData.apellido || '',
          email: user.email,
          proveedor: 'password',
          imgPerf: userData.imgPerf || ''
        });

        alert("Inicio de sesión exitoso!");
        this.router.navigate(['/tuPerfil']);

      } else {
        console.warn("⚠️ No se encontraron datos del usuario en el backend.");
      }
    });
      
    } catch (error: any) {
      console.error("Error en el login:", error);
      this.errorMessage = "⚠️ Error al iniciar sesión: " + (error.message || "Inténtalo nuevamente.");
    }
  }

loginWithGoogle() {
  this.authService.loginWithGoogle()
  .then((user) => {
    this.router.navigate(['/tuPerfil']);
  })
  .catch((error) => {
    console.error("❌ Error al iniciar sesión con Google:", error);
  });
}

  loginWithGitHub() {
    this.authService.loginWithGitHub()
      .then(user => {
        console.log("✅ Inicio de sesión con GitHub exitoso:", user);
        alert("Inicio de sesión con GitHub exitoso!");
        this.router.navigate(['/tuPerfil']);
      })
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          alert('⚠️ Cuenta ya existe con otro proveedor.');
          this.errorMessage = "⚠️ Ya existe una cuenta con este correo usando otro método de inicio de sesión.";
        } else {
          console.error("❌ Error en GitHub login:", error);
          this.errorMessage = "⚠️ Error al iniciar sesión con GitHub";
        }
      });
  }

loginFacebook() {
  this.authService.loginWithFacebook()
    .then((result: any) => {
      console.log('Autenticado con Facebook:', result.user);
      this.router.navigate(['/tuPerfil']);
    })
    .catch((error: any) => {
      console.error('Error con Facebook Login:', error);
      this.errorMessage = "⚠️ Error al iniciar sesión con Facebook";
    });
}


  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}