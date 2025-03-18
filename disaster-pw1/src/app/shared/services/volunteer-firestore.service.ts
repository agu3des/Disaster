import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from "@angular/fire/compat/firestore";
import { Volunteer } from '../model/volunteer';
import { from, map, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VolunteerFirestoreService {

  private injector = inject(Injector);
  private volunteerCollection: AngularFirestoreCollection<Volunteer>;
  private readonly COLLECTION_NAME = 'volunteers';

  constructor(private firestore: AngularFirestore) {
    this.volunteerCollection = this.firestore.collection(this.COLLECTION_NAME);
    runInInjectionContext(this.injector, () => {
      this.volunteerCollection = this.firestore.collection(this.COLLECTION_NAME);
    });
  }

  register(volunteer: Volunteer): Observable<Volunteer> {
    delete volunteer.id;
    return from(this.volunteerCollection.add({ ...volunteer })).pipe(
      switchMap((docRef: DocumentReference<Volunteer>) => docRef.get()),
      map(doc => ({ id: doc.id, ...doc.data() } as Volunteer))
    );
  }

  list(): Observable<Volunteer[]> {
    return runInInjectionContext(this.injector, () => {
      return this.volunteerCollection.valueChanges({ idField: 'id' });
    });
  }

  remove(id: string): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(this.volunteerCollection.doc(id).delete());
    });
  }

  getById(id: string): Observable<Volunteer> {
    return runInInjectionContext(this.injector, () => {
      return this.volunteerCollection.doc(id).get().pipe(
        map(document => new Volunteer(document.id, document.data()))
      );
    });
  }

  update(volunteer: Volunteer): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(this.volunteerCollection.doc(volunteer.id).update({ ...volunteer }));
    });
  }
}
