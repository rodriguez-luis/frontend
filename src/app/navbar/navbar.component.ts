import { Component, OnInit } from '@angular/core';
import { getType } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  type: number = 0;
  constructor(public dialog: MatDialog, public router: Router, public cartService: CartService) { }

  ngOnInit(): void {
    this.type = + (localStorage.getItem("type") || "0");
    this.cartService.setCart((localStorage.getItem("user")|| ""));
    this.cartService.getProducts();
  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent,{
      width: '515px',disableClose: false
    })
  }
  logout(){
    localStorage.setItem("type","0");
    this.router.navigateByUrl('/store');    
    window.location.reload();
  }
}
