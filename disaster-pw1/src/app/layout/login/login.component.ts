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
      console.log('Login manual com', this.email, this.password);
      this.closeLoginModal();
    } else {
      console.log('Preencha os campos de e-mail e senha.');
    }
  }

  openRegisterModal(): void {
    console.log('Abrindo modal de registro...');
    this.closeLoginModal();
  }
}