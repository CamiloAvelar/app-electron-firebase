import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  funcionariosCollection: AngularFirestoreCollection<Funcionario>;
  funcionarios: Observable<Funcionario[]>;
  funcDoc: AngularFirestoreDocument<Funcionario>;
  func: Observable<Funcionario>;

  constructor(public afs: AngularFirestore) { 
    //this.funcionarios = this.afs.collection('cadastro').valueChanges();
  }

  getFuncionarioById(funcId) {
    this.funcDoc = this.afs.doc('cadastro/'+funcId);
    this.func = this.funcDoc.valueChanges();

    return this.func;
  }

  getFuncionarioByName(funcName) {
    this.funcionariosCollection = this.afs.collection('cadastro', ref => ref.where('nome', '==', funcName));

    this.funcionarios = this.funcionariosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Funcionario;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.funcionarios;
  }

  getFuncionarioByMatricula(funcMatricula) {
    this.funcionariosCollection = this.afs.collection('cadastro', ref => ref.where('matricula', '==', funcMatricula));

    this.funcionarios = this.funcionariosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Funcionario;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.funcionarios;
  }

  getFuncionarios(){
    this.funcionariosCollection = this.afs.collection('cadastro');

    this.funcionarios = this.funcionariosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Funcionario;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.funcionarios;
  }

  addFuncionario(funcionario: Funcionario){
    this.funcionariosCollection.add(funcionario);
  }

}