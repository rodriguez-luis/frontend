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
  displayedColumns: string[] = ['date', 'total', 'details'];
  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.get().subscribe( orders =>
      {
        for (let order of orders){
          if (order.username == localStorage.getItem("user")){
            this.orders.push(order);
          }
        }
      }
    );    
  }
  details(cartId:number){

  }
}
