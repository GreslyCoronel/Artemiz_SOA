import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';          // Para HttpClient
import { switchMap } from 'rxjs/operators';                  // Para switchMap
import { of } from 'rxjs';         

@Component({
  selector: 'app-tu-perfil',
  templateUrl: './tu-perfil.component.html',
  styleUrls: ['./tu-perfil.component.css']
})
export class TuPerfilComponent implements OnInit {
  isloggedIn: boolean = false;
  userData: any = null;

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.isLoggedIn().pipe(
      switchMap(isLogged => {
        this.isloggedIn = isLogged;
        if (isLogged) {
          // Obtener usuario Firebase
          return this.authService.getCurrentUser();
        } else {
          return of(null);
        }
      }),
      switchMap(user => {
  if (user) {
    console.log('UID que se envía al backend:', `"${user.uid}"`);
    return this.http.get(`${this.apiUrl}/${user.uid}`);
  } else {
    console.log('No hay usuario autenticado');
    return of(null);
  }
})

    ).subscribe(data => {
      this.userData = data;
    });
  }
}