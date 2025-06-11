import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; 
  constructor(private http: HttpClient) {}

  obtenerUsuarioPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
