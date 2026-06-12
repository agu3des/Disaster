import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginModalComponent implements AfterViewInit {
  isLoginModalOpen = false;
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.renderizarBotaoGoogle();
  }

  renderizarBotaoGoogle(): void {
    const googleBtn = document.getElementById("google-btn");
    if (googleBtn) googleBtn.innerHTML = ''; 

    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '546841987983-qtjbnjgiet03tbk03uqiavtsdvbpmee0.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response)
      });

      google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        { theme: "outline", size: "large", width: 250 }
      );
    }
  }

  handleGoogleResponse(response: any): void {
    const idToken = response.credential; 
    console.log('Token recebido do Google com sucesso!');
    this.enviarTokenParaOBackend(idToken);
  }

  enviarTokenParaOBackend(idToken: string): void {
    this.http.post('http://localhost:8090/api/auth/google', { token: idToken })
    .subscribe({
      next: (resposta: any) => {
        console.log('Login na nossa API Spring Boot feito com sucesso!', resposta);
        localStorage.setItem('jwt_token', resposta.token);
        this.closeLoginModal();
        this.router.navigate(['/']); 
      },
      error: (erro) => {
        console.error('Erro ao enviar token para o back-end', erro);
      }
    });
  }

  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
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
              this.closeLoginModal();
              window.location.reload(); 
            },
            error: (err) => {
              console.error('Manual login error:', err);
              alert('Incorrect email or password!');
            }
          });

      } else {
        alert('Please fill in both the email and password fields.');
      }
    }

  openRegisterModal(): void {
    this.closeLoginModal();
  }
}