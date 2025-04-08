import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "./environments/environment"; 
import { provideSocialLogin } from '@abacritt/angularx-social-login';
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";

// Inicializa Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideSocialLogin({
      autoLogin: false, // No iniciar sesión automáticamente
      providers: [
        {
          id: GitHubLoginProvider.PROVIDER_ID,
          provider: new GitHubLoginProvider('TU_GITHUB_CLIENT_ID') // Reemplaza con tu ID real
        }
      ]
    })
  ]
};
