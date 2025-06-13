import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, sendPasswordResetEmail, FacebookAuthProvider } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  
  // Registro con email y contraseña
  async register(email: string, password: string, name: string, lastName: string, imgPerf?: string, proveedor?: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    const proveedorDetectado = user.providerData[0]?.providerId || 'correo';
    const perfilImg = imgPerf || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1706867365.jpg';
 
     //Luego de crear el usuario en Firebase registramos en MongoDB
    const payload = {
      firebaseUID: user.uid,
      nombre: name,
      apellido: lastName,
      email: email,
      imgPerf: perfilImg,
      proveedor: proveedorDetectado
    };
    console.log('Payload que se enviará:', payload);
    await this.http.post('http://localhost:3000/api/usuarios', payload).toPromise();

    //return user;
  } catch (error:any) {
    //console.error("Error en el registro:", error);
    //throw error;
    console.error("❌ Error en el registro:", error);

  if (error.status) {
    console.error("📛 Código de estado:", error.status);
    console.error("📩 Mensaje del backend:", error.error);
  } else {
    console.error("❓ Error inesperado:", error.message || error);
  }

  // Opcional: mostrar alerta al usuario
  alert("Ocurrió un error al registrar el usuario. Revisa la consola para más detalles.");
  
  throw error; // Re-lanza el error si quieres manejarlo arriba
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
  async loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(this.auth, provider);
  const user = credential.user;

  if (user) {
    const displayName = user.displayName || '';
    const nameParts = displayName.trim().split(' ');
    const nombre = nameParts[0] || 'Nombre';
    const apellido = nameParts.slice(1).join(' ') || 'Apellido';
    const proveedorDetectado = user.providerData[0]?.providerId || 'google';
    const perfilImg = user.photoURL || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1706867365.jpg';

    const payload = {
      firebaseUID: user.uid,
      nombre,
      apellido,
      email: user.email || '',
      imgPerf: perfilImg,
      proveedor: proveedorDetectado
    };

    console.log('📤 Enviando usuario a MongoDB:', payload);

    try {
      // Intentar registrar usuario en MongoDB
      await this.http.post('http://localhost:3000/api/usuarios', payload).toPromise();
    } catch (error: any) {
      if (error.status === 409) {
        console.warn("⚠️ Usuario ya registrado en MongoDB.");
      } else {
        console.error("❌ Error al registrar en MongoDB:", error);
        throw error;
      }
    }
  }

  return user;
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

 
