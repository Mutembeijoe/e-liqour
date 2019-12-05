import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  constructor(private route: ActivatedRoute, private router: Router, private categories: CategoriesService, private products: ProductsService) {
    this.categories$ = categories.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.products.getProduct(id).pipe(take(1)).subscribe(x => this.product = x);
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.products.save(product);
    this.router.navigate(['/admin/products']);
  }


}
