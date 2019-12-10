import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart;
  subscription: Subscription;
  constructor(private cartS: ShoppingCartService) { }

  async ngOnInit() {
    const cart$ = await this.cartS.getCart();
    this.subscription = cart$.subscribe(cart => { this.cart = cart; console.log(this.cart) });
  }

  placeOrder(value) {
    const order = {
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
          // totalPrice: i.quantity * i.product.price
          totalPrice: i.totalPrice
        };
      })
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
