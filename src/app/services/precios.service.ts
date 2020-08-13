import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Precio } from '../models/precio';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  precioCollection:AngularFirestoreCollection<Precio>;
  precios: Observable<Precio[]>;
  precios2: Precio[] = new Array< Precio>();

  constructor(public _db: AngularFirestore) {
    this.precioCollection = this._db.collection('precios');
    this.precios = this.precioCollection.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
       const data = a.payload.doc.data();
       data.id = a.payload.doc.id;
       data.ref = a.payload.doc.ref;
       return data;
      });
    }));
    this._db.collection('precios').get()
      .subscribe((res) => {
        res.docs.forEach((item: any) => {
          let precio:Precio = item.data();
          precio.id = item.id;
          precio.ref = item.ref;
          this.precios2.push(precio);
        });
      });
   }


  createPrecio(precio: any) {
    this.precioCollection.add(precio);
  }

  getPrecios() {
    return this.precios;
  }

  getPrecios2() {
    return this.precios2;
  }
}
