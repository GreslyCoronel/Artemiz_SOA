import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- importar esto
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements  OnInit {
   isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user; // true si hay sesión, false si no
    });
  }
}
