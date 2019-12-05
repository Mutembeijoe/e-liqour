import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productsS: ProductsService) {
    this.subscription = productsS.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  filter(query) {

    this.filteredProducts = (query) ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
      : this.filteredProducts = this.products;


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
