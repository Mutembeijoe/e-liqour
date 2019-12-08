import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCart();
    return this.db.object(`/shopping-carts/${cartId}`).valueChanges();
  }

  private getItem(cartId, productId) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    }

    const result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateQuantity(product: Product, quantity) {
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item.payload.exists()) {
        const myItem = item.payload.val();
        item$.update({ product, quantity: (myItem['quantity'] || 0) + quantity });
      } else {
        item$.set({ product, quantity: 1 });
      }
    });
  }

  async addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }
}
