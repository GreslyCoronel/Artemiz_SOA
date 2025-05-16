import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider
 } from '@angular/fire/auth';

import { sendPasswordResetEmail } from 'firebase/auth';

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

// Enviar correo para restablecer contraseña
async resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(this.auth, email);
    console.log('Correo de restablecimiento enviado.');
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw error;
  }
}

  logout() {
    return this.auth.signOut();
  }
}
