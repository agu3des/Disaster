import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MensagemIF } from '../shared/model/MensagemIF';
import { AuthModalService } from '../shared/services/auth-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private mensagemService: MensagemIF,
    private authModalService: AuthModalService
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      return true; 
    }
    this.mensagemService.erro('Access denied. Please log in to view this page.');
    
    this.router.navigate(['/app-home-page']); 
    
    this.authModalService.openLogin(); 

    return false;
  }
}