import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "./environments/environment"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Inicializa Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);