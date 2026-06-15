import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthModalService } from '../../shared/services/auth-modal.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginModalComponent implements OnInit { 
  isModalOpen = false;
  isLoginMode = true; 

  name = '';
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authModalService: AuthModalService
  ) { }

  ngOnInit(): void {
    this.authModalService.modalCommand$.subscribe(comando => {
      if (comando === 'register') {
        this.isModalOpen = true;
        this.isLoginMode = false; 
        setTimeout(() => this.renderGoogleButton(), 100);
      } else if (comando === 'login') {
        this.openModal();
      }
    });
  }

  renderGoogleButton(): void {
    const googleBtn = document.getElementById("google-btn");
    if (!googleBtn) {
      return; 
    }
    googleBtn.innerHTML = ''; 

    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '546841987983-qtjbnjgiet03tbk03uqiavtsdvbpmee0.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response)
      });

      google.accounts.id.renderButton(
        googleBtn,
        { theme: "outline", size: "large", width: 250 }
      );
    }
  }

  handleGoogleResponse(response: any): void {
    const idToken = response.credential; 
    console.log('Google token received successfully!');
    this.sendTokenToBackend(idToken);
  }

  sendTokenToBackend(idToken: string): void {
    this.http.post('http://localhost:8090/api/auth/google', { token: idToken })
    .subscribe({
      next: (response: any) => {
        console.log('Backend authentication successful!', response);
        localStorage.setItem('jwt_token', response.token);
        if (response.user) {
          localStorage.setItem('user_logged_in', JSON.stringify(response.user));
        }
        this.closeModal();
        window.location.reload(); 
      },
      error: (err) => {
        console.error('Error sending token to backend', err);
      }
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    this.isLoginMode = true; 
    setTimeout(() => this.renderGoogleButton(), 100); 
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.clearFields();
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.clearFields();
    setTimeout(() => this.renderGoogleButton(), 100); 
  }

  clearFields(): void {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onLoginSubmit(): void {
    if (this.email && this.password) {
      const credentials = {
        email: this.email,
        password: this.password
      };

      this.http.post('http://localhost:8090/api/auth/login', credentials)
        .subscribe({
          next: (response: any) => {
            console.log('Manual login successful!', response);
            localStorage.setItem('jwt_token', response.token);
            if (response.user) {
              localStorage.setItem('user_logged_in', JSON.stringify(response.user));
            }
            this.closeModal();
            window.location.reload(); 
          },
          error: (err) => {
            console.error('Manual login error:', err);
          }
        });

    } else {
      alert('Please fill in both the email and password fields.');
    }
  }

  onRegisterSubmit(): void {
    if (this.name && this.email && this.password) {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.http.post('http://localhost:8090/api/auth/register', newUser)
        .subscribe({
          next: (response: any) => {
            console.log('Registration successful!', response);
            localStorage.setItem('jwt_token', response.token);
            if (response.user) {
              localStorage.setItem('user_logged_in', JSON.stringify(response.user));
            }
            this.closeModal();
            window.location.reload(); 
          },
          error: (err) => {
            console.error('Registration error:', err);
          }
        });

    } else {
      alert('Please fill in all fields (Name, Email, and Password).');
    }
  }
}