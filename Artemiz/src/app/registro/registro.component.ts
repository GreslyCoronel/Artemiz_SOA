import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private http: HttpClient, private router:Router) {}

  // Validar email
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  async register() {
    this.errorMessage = ''; 
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_.,;:]).{8,}$/;
  
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = "⚠️ Todos los campos son obligatorios";
      return;
    }
  
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "⚠️ El formato del correo electrónico no es válido.";
      return;
    }
  
    if (!this.password.match(passwordRegex)) {
      this.errorMessage = "⚠️ La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "⚠️ Las contraseñas no coinciden";
      return;
    }
  
    try {
      // llamada completa con nombre y apellido
      await this.authService.register(this.email, this.password, this.name, this.lastName);
      alert("✅ Registro exitoso");

      this.router.navigate(['/tu-perfil']);

      // Limpiar campos
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.errorMessage = '';
    } catch (error: any) {
      console.error("Error en el registro:", error);
      if (error.message.includes('correo ya está registrado')) {
        this.errorMessage = "⚠️ Este correo ya existe. Intenta iniciar sesión.";
      } else if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = "⚠️ El correo ya está en uso por otra cuenta.";
      } else {
        this.errorMessage = "⚠️ Error en el registro: " + error.message;
      }
    }
  }
 
}  