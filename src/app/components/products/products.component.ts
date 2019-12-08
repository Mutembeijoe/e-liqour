import { Product } from './../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart;
  subscription: Subscription;
  constructor(private productS: ProductsService, private route: ActivatedRoute, private cartS: ShoppingCartService) {
    this.productS.getAll().pipe(
      switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(product => product.category === this.category) : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartS.getCart()).subscribe(cart => { this.shoppingCart = cart; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
