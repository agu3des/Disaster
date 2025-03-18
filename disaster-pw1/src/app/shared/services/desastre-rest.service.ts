import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Desastre } from "../model/desastre";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DesastreRestService {

  private URL_DESASTRES = environment.URL_DESASTRES;

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