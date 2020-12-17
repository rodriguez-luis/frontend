import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any; 
  constructor(private productService: ProductService, private dialog: MatDialog, public cartService: CartService, private snackBar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {
    this.product = this.productService.getLast();
  }
  getImg(){
    return this.product.img;
  }
  close(){
    this.dialog.closeAll();
  }
  addToCart(product: Product){
    this.cartService.addProduct(product);
    let sb = this.snackBar.open("Producto añadido","Ver carrito", {
      duration: 2000,
    });
    sb.onAction().subscribe(() => {
      this.dialog.closeAll(); 
      this.router.navigateByUrl('/cart')
    });
  }
}
