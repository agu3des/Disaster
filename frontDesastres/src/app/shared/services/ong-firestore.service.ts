import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from "@angular/fire/compat/firestore";
import { Ong } from '../model/ong';
import { from, map, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OngFirestoreService {

  private injector = inject(Injector);
  private ongCollection: AngularFirestoreCollection<Ong>;
  private readonly COLLECTION_NAME = 'ongs';

  constructor(private firestore: AngularFirestore) {
    this.ongCollection = this.firestore.collection(this.COLLECTION_NAME);
    runInInjectionContext(this.injector, () => {
      this.ongCollection = this.firestore.collection(this.COLLECTION_NAME);
    });
  }

  register(ong: Ong): Observable<Ong> {
    delete ong.id;
    return from(this.ongCollection.add({ ...ong })).pipe(
      switchMap((docRef: DocumentReference<Ong>) => docRef.get()),
      map(doc => ({ id: doc.id, ...doc.data() } as Ong))
    );
  }

  list(): Observable<Ong[]> {
    return this.ongCollection.valueChanges({ idField: 'id' });
  }

  remove(id: string): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(this.ongCollection.doc(id).delete());
    });
  }

  getById(id: string): Observable<Ong> {
    return runInInjectionContext(this.injector, () => {
      return this.ongCollection.doc(id).get().pipe(
        map(document => new Ong(document.id, document.data()))
      );
    });
  }

  update(ong: Ong): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(this.ongCollection.doc(ong.id).update({ ...ong }));
    });
  }
}
