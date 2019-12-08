import { CartItem } from './../../models/cart-item';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  constructor(private cart: ShoppingCartService) { }


  addToCart() {
    this.cart.addToCart(this.product);
  }

  removeFromCart() {
    this.cart.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
  }

}
