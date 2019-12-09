import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart;
  constructor(private cart: ShoppingCartService) { }


  addToCart() {
    this.cart.addToCart(this.product);
  }

  removeFromCart() {
    this.cart.removeFromCart(this.product);
  }

}
