import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Configuración de Firebase
    provideAuth(() => getAuth()), // Autenticación con Firebase
    importProvidersFrom(FormsModule, ReactiveFormsModule), 
    provideHttpClient(),
    provideFirestore(() => getFirestore()),
  ],
}).catch((err) => console.error(err));
