import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../layout/login/login.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    constructor(public dialog: MatDialog) {}

  abrirModalLogin() {
    this.dialog.open(LoginModalComponent, {
      width: '400px'
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getUserEmail(): string {
    const token = localStorage.getItem('jwt_token');
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; 
    } catch (e) {
      return 'Usuário';
    }
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    window.location.reload(); 
  }
}
