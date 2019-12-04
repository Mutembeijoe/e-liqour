import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(private categories: CategoriesService, private products: ProductsService) {
    this.categories$ = categories.getCategories();
  }

  ngOnInit() {
  }

  save(product) {
    this.products.save(product);
  }

}
