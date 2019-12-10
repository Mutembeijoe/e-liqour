
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  constructor(private orderS: OrderService, private authS: AuthService) { }

  ngOnInit() {
    this.orders$ = this.authS.user$.pipe
      (
        switchMap(user => this.orderS.getUserOrders(user.uid))
      )
  }

}
