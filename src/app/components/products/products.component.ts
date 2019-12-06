import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  constructor(private productS: ProductsService) {
    this.products$ = this.productS.getAll();
  }

  ngOnInit() {
  }

}
