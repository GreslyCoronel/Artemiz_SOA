## Firebase en Angular

### **¿Qué es Firebase?**
![Firebase Logo](https://firebase.google.com/downloads/brand-guidelines/SVG/logo-standard.svg)

Firebase es una plataforma Backend-as-a-Service (BaaS) desarrollada por Google que proporciona una serie de herramientas en la nube para facilitar el desarrollo de aplicaciones web y móviles. Incluye autenticación, bases de datos, almacenamiento en la nube y más.

### **Instalación de Firebase en Angular**

Para integrar Firebase en tu proyecto Angular, instala el SDK de Firebase y AngularFire:

```sh
ng add @angular/fire
```

Este comando instalará Firebase y configurará automáticamente los módulos necesarios.

### **Configuración de Firebase**

Después de instalar Firebase, debes configurar tu aplicación con las credenciales de tu proyecto de Firebase. Agrega tu configuración en el archivo `environment.ts`:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

### **Autenticación con Firebase**

Para habilitar autenticación en tu aplicación, importa y configura `AngularFireAuthModule` en `app.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### **Ejemplo de login con Firebase Authentication**

En un servicio de autenticación (`auth.service.ts`):

```ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
```

### **Conclusión**
Firebase es una excelente opción para manejar la autenticación y otras funciones backend sin necesidad de crear un servidor propio. Con su integración en Angular, puedes desarrollar aplicaciones web escalables y seguras de manera eficiente.
