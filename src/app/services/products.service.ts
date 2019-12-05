import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }



  save(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getProduct(key) {
    return this.db.object(`/products/${key}`).valueChanges();
  }

  updateProduct(key, product) {
    return this.db.object(`/products/${key}`).update(product);
  }

  deleteProduct(key) {
    return this.db.object(`/products/${key}`).remove();
  }



}
