import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider

 } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Inyección de Firebase Auth
  

   // Registrar usuario con Firebase Authentication
   async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  }
  // Iniciar sesión 
  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Correo y contraseña son obligatorios");
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }

 //logeo con la cuenta de google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  //Login con Git Hub
  loginWithGitHub(){
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider )
  }

  //Login con Facebook
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }


  logout() {
    return this.auth.signOut();
  }
}
