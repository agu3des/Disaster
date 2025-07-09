import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Volunteer } from "../model/volunteer";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VolunteerRestService {

  private URL_VOLUNTEERS = 'http://localhost:3000/volunteers';

  constructor(private http: HttpClient) { }

  register(volunteer: Volunteer): Observable<Volunteer> {
    delete volunteer.id;
    return this.http.post<Volunteer>(this.URL_VOLUNTEERS, volunteer);
  }

  list(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.URL_VOLUNTEERS);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.URL_VOLUNTEERS}/${id}`);
  }

  getById(id: string): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${this.URL_VOLUNTEERS}/${id}`);
  }

  update(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.put<Volunteer>(`${this.URL_VOLUNTEERS}/${volunteer.id}`, volunteer);
  }
}
