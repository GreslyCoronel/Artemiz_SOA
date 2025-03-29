import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "./environments/environment"; 

// Inicializa Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);