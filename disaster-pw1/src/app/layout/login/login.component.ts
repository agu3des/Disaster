import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginModalComponent {
  isLoginModalOpen = false;
  email = '';
  password = '';

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  onLoginSubmit() {
    if (this.email && this.password) {
      console.log('Login successful with', this.email, this.password);
      this.closeLoginModal();
    } else {
      console.log('Please fill in all fields');
    }
  }

  openRegisterModal() {
    console.log('Opening registration modal');
    this.closeLoginModal();
  }
}