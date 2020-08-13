import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inscripcion } from '../models/inscripccion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripcionCollection:AngularFirestoreCollection<Inscripcion>;
  inscripciones: DocumentData[] = new Array<Inscripcion>();
  inscripcionDoc;
  inscripcioneliminar:AngularFirestoreDocument<Inscripcion>

  constructor(public _db: AngularFirestore) { 

    this.inscripcionCollection = this._db.collection('inscripciones');
    this.inscripcionCollection.get()
      .subscribe(res => {
        res.forEach((inscripcion) => {

          let inscripcionObtenida = inscripcion.data();
          inscripcionObtenida.id = inscripcion.id;

          this._db.doc(inscripcion.data().cliente.path).get()
            .subscribe((cliente) => {
              inscripcionObtenida.clienteObtenido = cliente.data()
              inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
              inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds *1000);
            });
          
            this._db.doc(inscripcion.data().precios.path).get()
            .subscribe((precio) => {
              inscripcionObtenida.precioObtenido = precio.data()
            });
          
              this.inscripciones.push(inscripcionObtenida);
        });
      });
  }

  createInscripcion(inscripcion: any) {

  }

  getInscripciones() {
    return this.inscripciones;
  }

  getOneIncripcion(id){
    return  this._db.doc(`inscripciones/${id}`).get()
      .subscribe((inscripcion) => {

        let inscripcionObtenida = inscripcion.data();
        this._db.doc(inscripcion.data().cliente.path).get()
            .subscribe((cliente) => {
              inscripcionObtenida.clienteObtenido = cliente.data()
              inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
              inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds *1000);
            });
        this._db.doc(inscripcion.data().precios.path).get()
        .subscribe((precio) => {
          inscripcionObtenida.precioObtenido = precio.data()
        });

        this.inscripcionDoc = inscripcionObtenida;
        console.log(this.inscripcionDoc);
        
      })
  }

  deleteIncripcion(inscripcion: any) {
    this.inscripcioneliminar = this._db.doc(`inscripciones/${inscripcion.id}`);
    this.inscripcioneliminar.delete();
  }
}
