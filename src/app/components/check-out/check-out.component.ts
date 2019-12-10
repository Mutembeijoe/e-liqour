import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

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
  constructor(private cartS: ShoppingCartService, private orderS: OrderService, private authS: AuthService, private router: Router) { }

  async ngOnInit() {
    const cart$ = await this.cartS.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.authSubscription = this.authS.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(value) {
    const order = new Order(this.userId, value, this.cart);
    const result = await this.orderS.placeOrder(order);
    this.router.navigate(['order-success', result.key]);

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
