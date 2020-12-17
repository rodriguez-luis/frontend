import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = 'http://localhost:8080/v1/order/';
  orders: any[]= [];
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  post(order: any): Observable<any>{
    return this.http.post<any>(this.url, order);
  }
  get(){
    this.http.get<Order[]>(this.url).subscribe( orders =>
      {
        this.orders = [];
        for (let order of orders){
          if (order.username == (localStorage.getItem("user")||"null")){
            this.orders.push(order);
          }
        }
      }
    );
  }
  getOrders(){
    this.get();
    return this.orders;
  }
}
