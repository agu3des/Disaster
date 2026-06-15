import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  private modalCommandSource = new Subject<'login' | 'register'>();
  
  modalCommand$ = this.modalCommandSource.asObservable();

  openLogin() {
    this.modalCommandSource.next('login');
  }

  openRegister() {
    this.modalCommandSource.next('register');
  }
}