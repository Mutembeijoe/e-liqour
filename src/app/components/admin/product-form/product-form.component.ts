import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(private categories: CategoriesService) {
    this.categories$ = categories.getCategories();
  }

  ngOnInit() {
  }

}
