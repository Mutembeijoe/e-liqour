import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartS: ShoppingCartService) { }


  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.cartS.clearCart();
    return result;
  }

  getOrders() {
    // return this.db.list('/orders').valueChanges();
    return this.db.list('/orders').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  getProduct(key) {
    return this.db.object(`/orders/${key}`).valueChanges();
  }

  getOrder(key) {
    return this.db.object(`/orders/${key}`).valueChanges();
  }
}
