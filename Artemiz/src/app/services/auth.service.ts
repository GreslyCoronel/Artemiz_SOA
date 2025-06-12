import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, sendPasswordResetEmail, FacebookAuthProvider } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  async isEmailRegistered(email: string): Promise<boolean> {
    const methods = await fetchSignInMethodsForEmail(this.auth, email);
    return methods.length > 0;
  }

  // Registro con email y contraseña
  async register(email: string, password: string, name: string, lastName: string) {
   try {
    // Verifica si el correo ya está registrado en Firebase
    const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
    if (signInMethods.length > 0) {
      throw new Error('El correo ya está registrado. Intenta iniciar sesión.');
    }

    // Si no está registrado, crea el usuario
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Registrar también en MongoDB
    const payload = {
      firebaseUID: user.uid,
      nombre: name,
      apellido: lastName
    };

    await this.http.post('http://localhost:3000/api/usuarios', payload).toPromise();

    return user;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
}
  //Crear usuario en MongoDB
createUserInMongo(firebaseUID: string, nombre: string, apellido: string, imgPerf?: string) {
  const body = { firebaseUID, nombre, apellido, imgPerf };
  return this.http.post(this.apiUrl, body);
}


  // Inicio de sesión
  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Correo y contraseña son obligatorios");
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Login con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Login con GitHub
  loginWithGitHub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  //Login con Facebook
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Restablecer contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de restablecimiento enviado.');
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw error;
    }
  }

  // Cerrar sesión
  logout() {
    return this.auth.signOut();
  }

  // ✅ Obtener usuario autenticado como observable
  getCurrentUser(): Observable<User | null> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        observer.next(user);
      });
    });
  }

  // ✅ Verificar si el usuario está logueado (sin usar localStorage)
  isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        observer.next(!!user);
      });
    });
  }

getUserDataFromBackend(): Observable<any> {
  return new Observable(observer => {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.http.get(`${this.apiUrl}/${user.uid}`).subscribe({
          next: (data) => observer.next(data),
          error: (err) => {
            console.error('Error en la petición:', err);
            observer.next(null); // Maneja el error sin romper el flujo
          }
        });
      } else {
        observer.next(null);
      }
    });
  });
}
// Actualizar datos del usuario en backend
updateUserData(firebaseUID: string, nombre: string, apellido: string, imgPerf?: string) {
  const body = { nombre, apellido, imgPerf };
  return this.http.put(`${this.apiUrl}/${firebaseUID}`, body);
}

}