import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Doacao } from "../model/doacao";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoacaoRestService {

  private URL_DOACOES = 'http://localhost:3000/doacaos';

  constructor(private http: HttpClient) { }

  cadastrar(doacao: Doacao): Observable<Doacao> {
    delete doacao.id;
    return this.http.post<Doacao>(this.URL_DOACOES, doacao);
  }

  listar(): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(this.URL_DOACOES);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.URL_DOACOES}/${id}`);
  }

  pesquisarPorId(idEdicao: string): Observable<Doacao> {
    return this.http.get<Doacao>(`${this.URL_DOACOES}/${idEdicao}`);
  }

  atualizar(doacao: Doacao): Observable<Doacao> {
    return this.http.put<Doacao>(`${this.URL_DOACOES}/${doacao.id}`, doacao);
  }
}