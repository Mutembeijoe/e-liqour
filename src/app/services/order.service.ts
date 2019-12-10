import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

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
}
