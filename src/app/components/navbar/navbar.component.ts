import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AppUser } from './../../models/appuser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartCount$;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private cartS: ShoppingCartService) {
    this.auth.appUser.subscribe((user: AppUser) => this.appUser = user);
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    // const cart$ = await this.cartS.getCart();
    // cart$.subscribe((cart: ShoppingCart) => {
    //   this.shoppingCartCount = 0;
    //   for (const productId in cart.items) {
    //     this.shoppingCartCount += cart.items[productId].quantity;
    //   }
    //   console.log(this.shoppingCartCount);
    // });

    // this.shoppingCartCount$ = await this.cartS.getTotalItemsCount();
    this.cart$ = await this.cartS.getCart();
  }


}
