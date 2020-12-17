import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = 'http://localhost:8080/v1/order/'
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  post(order: any): Observable<any>{
    return this.http.post<any>(this.url, order);
  }}
}
