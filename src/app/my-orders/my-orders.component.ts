import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../model/order';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[]=[];
  displayedColumns = ['date', 'total', 'details'];
  constructor(public orderService: OrderService, public cartService: CartService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrders();
    console.log(this.orders);
  }
  getOrders(){
    this.orders = this.orderService.getOrders();
  }
  details(cartId:number){
    this.cartService.selectDetails(cartId);
    const dialogRef = this.dialog.open(OrderDetailsComponent,{
      width: '720px',disableClose: false
    });
  }
}
