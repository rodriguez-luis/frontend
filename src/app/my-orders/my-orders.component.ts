import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[]=[];
  displayedColumns = ['date', 'total', 'details'];
  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
    console.log(this.orders);
  }
  getOrders(){
    this.orders = this.orderService.getOrders();
  }
  details(cartId:number){
    alert("ga");
  }
}
