import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
