import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart;
  cartSubscription: Subscription;
  authSubscription: Subscription;
  userId;
  constructor(private cartS: ShoppingCartService, private orderS: OrderService, private authS: AuthService) { }

  async ngOnInit() {
    const cart$ = await this.cartS.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.authSubscription = this.authS.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder(value) {
    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: value,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };
    this.orderS.saveOrder(order);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
