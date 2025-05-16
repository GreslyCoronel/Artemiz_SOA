import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
  imports: [ReactiveFormsModule]
})
export class CambiarPasswordComponent {
  cambiarPasswordForm: FormGroup;
  emailPass: string = '';
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.cambiarPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  async resetPass() {
    if (this.cambiarPasswordForm.valid) {
      try {
        this.emailPass = this.cambiarPasswordForm.value.email;
        await this.authSvc.resetPassword(this.emailPass);
        this.mensaje = 'Correo de recuperación enviado. Revisa tu bandeja.';
      } catch (error) {
        console.error(error);
        this.mensaje = 'Ocurrió un error al enviar el correo.';
      }
    } else {
      this.mensaje = 'Por favor ingresa un correo válido.';
    }
  }
}
