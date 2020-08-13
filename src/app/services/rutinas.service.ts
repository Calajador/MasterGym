import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rutina } from '../models/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  rutinasCollection: AngularFirestoreCollection<Rutina>;
  rutinas: Observable<Rutina[]>;
  rutinaDoc: AngularFirestoreDocument<Rutina>;

  constructor(public _db: AngularFirestore) {
    this.rutinasCollection = this._db.collection('rutinas');
    this.rutinas = this.rutinasCollection.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
       const data = a.payload.doc.data() as Rutina;
       data.id = a.payload.doc.id;
       return data;
      });
    }));
   }

   getRutinas() {
     return this.rutinas;
   }

   addRutina(rutina: any) {
    this.rutinasCollection.add(rutina);
   }

   deleteRutina(rutina: any) {
    this.rutinaDoc = this._db.doc(`rutinas/${rutina.id}`);
    this.rutinaDoc.delete();
   }
}

