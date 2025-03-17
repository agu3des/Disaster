import { Volunteer } from "../model/volunteer";
import { Observable } from "rxjs";

export abstract class VolunteerServiceIF {

    abstract register(volunteer: Volunteer): Observable<Volunteer>;

    abstract list(): Observable<Volunteer[]>;

    abstract remove(id: string): Observable<any>;

    abstract update(volunteer: Volunteer): Observable<any>;

}