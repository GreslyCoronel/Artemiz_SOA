import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; 
  constructor(private http: HttpClient) {}

  getUsuarioPorFirebaseUID(firebaseUID: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/usuarios/${firebaseUID}`);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/usuarios`, usuario);
  }

 
}

