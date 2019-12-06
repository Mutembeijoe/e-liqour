import { Product } from './../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;
  constructor(private productS: ProductsService, private categoryS: CategoriesService, private route: ActivatedRoute) {
    this.productS.getAll().pipe(
      switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(product => product.category === this.category) : this.products;
    });

    this.categories$ = this.categoryS.getAll();

  }

  ngOnInit() {
  }

}
