import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Funcionario } from '../models/funcionario';
import { Atestado } from '../models/Atestado';
import { Ferias } from '../models/Ferias';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  funcionariosCollection: AngularFirestoreCollection<Funcionario>;
  atestadosCollection: AngularFirestoreCollection<Atestado>;
  feriasCollection: AngularFirestoreCollection<Ferias>;
  feriasPremioCollection: AngularFirestoreCollection<Ferias>;
  funcionarios: Observable<Funcionario[]>;
  atestados: Observable<Atestado[]>;
  ferias: Observable<Ferias[]>;
  feriasPremio: Observable<Ferias[]>;
  funcDoc: AngularFirestoreDocument<Funcionario>;
  atestadoDoc: AngularFirestoreDocument<Atestado>;
  feriasDoc: AngularFirestoreDocument<Ferias>;
  feriasPremioDoc: AngularFirestoreDocument<Ferias>;
  func: Observable<Funcionario>;

  constructor(public afs: AngularFirestore) { 
    //this.funcionarios = this.afs.collection('cadastro').valueChanges();
  }

  getFuncionarioById(funcId): Observable<Funcionario> {
    this.funcDoc = this.afs.doc('cadastro/'+funcId);
    this.func = this.funcDoc.valueChanges();

    return this.func;
  }

  getFuncionarioByName(funcName): Observable<Funcionario[]> {
    this.funcionariosCollection = this.afs.collection('cadastro', ref => ref.where('nome', '==', funcName));

    this.funcionarios = this.funcionariosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Funcionario;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.funcionarios;
  }

  getFuncionarioByMatricula(funcMatricula): Observable<Funcionario[]> {
    this.funcionariosCollection = this.afs.collection('cadastro', ref => ref.where('matricula', '==', funcMatricula));

    this.funcionarios = this.funcionariosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Funcionario;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.funcionarios;
  }

  getFuncionarios(): Observable<Funcionario[]>{
    this.funcionariosCollection = this.afs.collection('cadastro', funcionarios => funcionarios.orderBy('nome', 'asc'));

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

  deleteFuncionario(funcionario: Funcionario){
    this.funcDoc = this.afs.doc(`cadastro/${funcionario.id}`);
    this.funcDoc.delete();
  }

  deleteAtestado(id: string, atestadoId: string){
    this.atestadoDoc = this.afs.doc(`cadastro/${id}/atestados/${atestadoId}`);
    this.atestadoDoc.delete();
  }

  deleteFerias(id: string, feriasId: string){
    this.feriasDoc = this.afs.doc(`cadastro/${id}/ferias/${feriasId}`);
    this.feriasDoc.delete();
  }

  deleteFeriasPremio(id: string, feriasPremioId: string){
    this.feriasPremioDoc = this.afs.doc(`cadastro/${id}/feriaspremio/${feriasPremioId}`);
    this.feriasPremioDoc.delete();
  }

  updateFuncionario(funcionario: Funcionario) {
    this.funcDoc = this.afs.doc(`cadastro/${funcionario.id}`);
    this.funcDoc.update(funcionario);
  }

  addAtestado(id: string, atestado: Atestado){
    this.atestadosCollection = this.afs.collection(`cadastro/${id}/atestados`);
    this.atestadosCollection.add(atestado);
  }

  getFuncionarioAtestados(id): Observable<Atestado[]>{
    this.atestadosCollection = this.afs.collection(`cadastro/${id}/atestados`, atestados => atestados.orderBy('data', 'desc'));

    this.atestados = this.atestadosCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Atestado;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.atestados;
  }

  addFerias(id: string, ferias: Ferias){
    this.feriasCollection = this.afs.collection(`cadastro/${id}/ferias`);
    this.feriasCollection.add(ferias);
  }

  addFeriasPremio(id: string, ferias: Ferias){
    this.feriasCollection = this.afs.collection(`cadastro/${id}/feriaspremio`);
    this.feriasCollection.add(ferias);
  }

  getFuncionarioFerias(id): Observable<Ferias[]>{
    this.feriasCollection = this.afs.collection(`cadastro/${id}/ferias`, ferias => ferias.orderBy('inicio', 'desc'));

    this.ferias = this.feriasCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Ferias;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.ferias;
  }

  getFuncionarioFeriasPremio(id): Observable<Ferias[]>{
    this.feriasPremioCollection = this.afs.collection(`cadastro/${id}/feriaspremio`, feriasPremio => feriasPremio.orderBy('inicio', 'desc'));

    this.feriasPremio = this.feriasPremioCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Ferias;
        const id = a.payload.doc.id;
        return { id, ...data}
      })));

    return this.feriasPremio;
  }

}