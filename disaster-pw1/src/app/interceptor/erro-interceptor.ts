import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { MensagemIF } from "../shared/model/MensagemIF";

@Injectable()
export class ErroInterceptor implements HttpInterceptor {
    constructor(private mensagemService: MensagemIF) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('TESTE INTERCEPT');
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => this.processarErroResposta(err))
        );
    }

    processarErroResposta(erro: HttpErrorResponse): Observable<HttpEvent<any>> {
        this.mensagemService.erro(erro.message);
        return throwError(() => erro);
    }
}