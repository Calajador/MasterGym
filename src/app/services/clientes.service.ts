import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clienteCollection:AngularFirestoreCollection<Cliente>;
  clientes:Observable<Cliente[]>;
  clienteDoc:AngularFirestoreDocument<Cliente>;

  constructor(public _db: AngularFirestore) { 

    this.clienteCollection = this._db.collection('clientes');
    this.clientes = this.clienteCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
         const data = a.payload.doc.data();
         data.id = a.payload.doc.id;
         data.ref = a.payload.doc.ref;
         data.visible = false
         return data;
        });
      }));
  }

  getClientes() {
    return this.clientes;
  }
 
  createCliente(cliente: any) {
    this.clienteCollection.add(cliente);
  }

  deleteCliente(cliente: any) {
    this.clienteDoc = this._db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
}
