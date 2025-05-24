import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';          // Para HttpClient
import { switchMap } from 'rxjs/operators';                  // Para switchMap
import { of } from 'rxjs';       
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-tu-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tu-perfil.component.html',
  styleUrls: ['./tu-perfil.component.css']
})
export class TuPerfilComponent implements OnInit {
  isloggedIn: boolean = false;
  userData: any = null;
  modoEdicion: boolean = false;
   mensaje = '';        // Mensaje para mostrar alertas
  mensajeTipo = '';

  

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().pipe(
      switchMap(isLogged => {
        this.isloggedIn = isLogged;
        if (isLogged) {
          // Obtener usuario Firebase
          return this.authService.getCurrentUser();
        } else {
          return of(null);
        }
      }),
      switchMap(user => {
  if (user) {
    console.log('UID que se envía al backend:', `"${user.uid}"`);
    return this.http.get(`${this.apiUrl}/${user.uid}`);
  } else {
    console.log('No hay usuario autenticado');
    return of(null);
  }
})

    ).subscribe(data => {
      this.userData = data;
    });
  }
   editarPerfil() {
    if (!this.userData || !this.userData.firebaseUID) {
      this.mensaje = 'No hay datos del usuario para editar';
      this.mensajeTipo = 'error';
      return;
    }

    this.http.put(`${this.apiUrl}/${this.userData.firebaseUID}`, this.userData).subscribe(
      () => {
        this.mensaje = '✅ Cambios guardados con éxito';
        this.mensajeTipo = 'exito';
        this.modoEdicion = false;

        //limpiar el mensaje después de 3 segundos
        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
        }, 3000);
      },
      error => {
        this.mensaje = '❌ Error al guardar cambios: ' + (error.message || 'Error desconocido');
        this.mensajeTipo = 'error';

        setTimeout(() => {
          this.mensaje = '';
          this.mensajeTipo = '';
        }, 3000);
      }
    );
  }
eliminarPerfil() {
    if (!this.userData?.firebaseUID) {
      this.mensaje = 'No se puede eliminar: datos de usuario faltantes';
      this.mensajeTipo = 'error';
      return;
    }

    if (!confirm('¿Estás seguro de eliminar tu perfil? Esta acción es irreversible.')) {
      return; // El usuario canceló
    }

    this.http.delete(`http://localhost:3000/api/usuarios/${this.userData.firebaseUID}`)
      .subscribe({
        next: () => {
          alert('Perfil eliminado correctamente');
          // Aquí también podrías cerrar sesión si quieres
          this.authService.logout();  // si tienes método logout
          this.router.navigate(['/login']);  // redirigir al login
        },
        error: (err) => {
          console.error('Error al eliminar perfil:', err);
          this.mensaje = 'Error al eliminar el perfil. Inténtalo más tarde.';
          this.mensajeTipo = 'error';
        }
      });
  }

 

}
