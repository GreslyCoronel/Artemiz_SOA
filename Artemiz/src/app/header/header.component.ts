import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements  OnInit {
  
   isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
      console.log('¿Está logueado?', isLogged);
    });
  }

   logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); 
    }).catch(err => {
      console.error('Error al cerrar sesión:', err);
    });
  }
}
