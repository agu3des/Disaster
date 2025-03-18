import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Desastre } from '../model/desastre';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Injectable({
 providedIn: 'root'
})
export class DesastreFirestoreService {


  colecaoDesastres: AngularFirestoreCollection<Desastre>;
  NOME_COLECAO = 'desastres';


  constructor(private afs: AngularFirestore) {
    this.colecaoDesastres = afs.collection(this.NOME_COLECAO);
  }


  listar(): Observable<Desastre[]> {
    return this.colecaoDesastres.valueChanges({idField: 'id'});
  }


  cadastrar(desastre: Desastre): Observable<object> {
    delete desastre.id;
    return from(this.colecaoDesastres.add(Object.assign({}, desastre)));
  }


  remover(id: string): Observable<void> {
    return from(this.colecaoDesastres.doc(id).delete());
  }


  pesquisarPorId(id: string): Observable<Desastre> {
    return this.colecaoDesastres.doc(id).get().pipe(map(document => new Desastre(document.id, document.data())));
  }
  
  atualizar(desastre: Desastre): Observable<void> {
    const id = desastre.id;
    delete desastre.id;
    return from(this.colecaoDesastres.doc(id).update(Object.assign({}, desastre)));
  }


}
