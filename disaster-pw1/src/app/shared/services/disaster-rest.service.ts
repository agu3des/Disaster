import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Disaster } from "../model/disaster";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DisasterRestService { 

  private URL_DISASTERS = environment.URL_DISASTERS; 

  constructor(private http: HttpClient) { }

  register(disaster: Disaster): Observable<Disaster> {
    delete disaster.id;
    return this.http.post<Disaster>(this.URL_DISASTERS, disaster);
  }

  list(): Observable<Disaster[]> {
    return this.http.get<Disaster[]>(this.URL_DISASTERS);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.URL_DISASTERS}/${id}`);
}

  findById(id: string): Observable<Disaster> {
    return this.http.get<Disaster>(`${this.URL_DISASTERS}/${id}`);
  }

  update(disaster: Disaster): Observable<Disaster> {
    return this.http.put<Disaster>(`${this.URL_DISASTERS}/${disaster.id}`, disaster);
  }
}