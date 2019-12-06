import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-tabs',
  templateUrl: './category-tabs.component.html',
  styleUrls: ['./category-tabs.component.css']
})
export class CategoryTabsComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(private categoryS: CategoriesService) {
    this.categories$ = this.categoryS.getAll();
  }

  ngOnInit() {
  }

}
