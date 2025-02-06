import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Desastre} from "../modelo/desastre";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DesastreRestService {

  private URL_DESASTRES = 'http://localhost:3000/desastres';

  constructor(private http: HttpClient) { }

  cadastrar(desastre: Desastre): Observable<Desastre> {
    delete desastre.id;
    return this.http.post<Desastre>(this.URL_DESASTRES, desastre);
  }

  listar(): Observable<Desastre[]> {
    return this.http.get<Desastre[]>(this.URL_DESASTRES);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.URL_DESASTRES}/${id}`);
  }

  pesquisarPorId(idEdicao: string): Observable<Desastre> {
    return this.http.get<Desastre>(`${this.URL_DESASTRES}/${idEdicao}`);
  }

  atualizar(desastre: Desastre): Observable<Desastre> {
    return this.http.put<Desastre>(`${this.URL_DESASTRES}/${desastre.id}`, desastre);
  }
}