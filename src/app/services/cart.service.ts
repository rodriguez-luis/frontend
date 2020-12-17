import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Cart } from '../model/cart';
import { Details } from '../model/details';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = 'http://localhost:8080/v1/cart/';
  products: Product[] = [];
  total: number = 0;
  cart:any;
  details:any;
  orderDetails: Product[]=[];
  constructor(private http: HttpClient) {
  }
  setCart(username: string){
    this.http.get<Cart>(this.url+username).subscribe( _ => {this.cart = _;
      this.requestProducts();
    });
  }
  getCart(){
    return this.cart;
  }
  addProduct(details: any): Observable<any>{
    return this.http.post<any>(this.url+'details',details);
  }
  clear(){
    this.products = [];
  }
  selectDetails(cartId: number){
    this.http.get<Details[]>(this.url+'details/'+cartId).subscribe(
      details => {
        this.details = details;
        this.clear();
        for (let detail of details){
          this.http.get<Product>('http://localhost:8080/v1/product/'+detail.productId).subscribe(
            product => this.orderDetails.push(product)
          );
        }
      }
    ); 
  }
  getDetails(cartId:number){
    this.selectDetails(cartId);
    return this.orderDetails;

  }
  requestProducts(){
    this.http.get<Details[]>(this.url+'details/'+this.cart.cartId).subscribe(
      details => {
        this.details = details;
        this.clear();
        for (let detail of details){
          this.http.get<Product>('http://localhost:8080/v1/product/'+detail.productId).subscribe(
            product => this.products.push(product)
          );
        }
      }
    );
  }
  getProducts(){
    this.requestProducts();
    return this.products;
  }
  getTotal():number{
    this.total = 0;
    for (let product of this.products){
      this.total+=product.unitPrice;
      console.log(product.unitPrice);
    }
    return this.total;
  }
  createCart(){
    this.http.post<any>(this.url,{"username":localStorage.getItem("user"),"cartStatus":1}).subscribe(
      _ => {this.setCart(localStorage.getItem("user")||""); this.products = [];} 
    );
  }
  deleteProduct(product: Product){
    this.http.patch<any>(this.url+'details/'+product.productId,{}).subscribe(
      _ => {this.requestProducts()}
    );
  }
}
