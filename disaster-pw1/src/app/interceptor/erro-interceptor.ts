import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MensagemIF } from "../shared/model/MensagemIF";
import { AuthModalService } from '../shared/services/auth-modal.service';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    constructor(
        private mensagemService: MensagemIF, 
        private router: Router,
        private authModalService: AuthModalService 
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => this.processarErroResposta(err))
        );
    }

    processarErroResposta(erro: HttpErrorResponse): Observable<HttpEvent<any>> {
        if ((erro.status === 401 || erro.status === 403) && erro.url?.includes('auth/login')) {
            const serverError = erro.error;

            if (serverError && serverError.code === 'USER_NOT_FOUND') {
                this.mensagemService.erro('Account not found. Redirecting to Sign Up...');
                this.authModalService.openRegister(); 
            } else {
                this.mensagemService.erro('Incorrect password.');
            }
        } 
        else if (erro.status === 401 || erro.status === 403) {
            localStorage.removeItem('jwt_token');
            this.mensagemService.erro('Your session has expired. Please log in again.');
            this.router.navigate(['/']); 
        } 
        else {
            this.mensagemService.erro('An error occurred while communicating with the server.');
        }

        return throwError(() => erro);
    }
}