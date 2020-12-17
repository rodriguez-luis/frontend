import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../services/order.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";
  total: number = 0;
  address: string = "";
  constructor(private router: Router,private formBuilder: FormBuilder, public cartService: CartService, private dialog: MatDialog, private checkoutService: OrderService) {}
  
  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
    this.getTotal();
  }
  getTotal(){
    this.total= this.cartService.getTotal();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email],
        this.checkInUseEmail
      ],
      name: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      description: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      validate: ""
    });
  }
  
  setChangeValidate() {
    this.formGroup.get("validate").valueChanges.subscribe((validate: any) => {
      if (validate == "1") {
        this.formGroup
          .get("name")
          .setValidators([Validators.required, Validators.minLength(5)]);
        this.titleAlert = "You need to specify at least 5 characters";
      } else {
        this.formGroup.get("name").setValidators(Validators.required);
      }
      this.formGroup.get("name").updateValueAndValidity();
    });
  }
  
  get name() {
    return this.formGroup.get("name") as FormControl;
  }
  
  checkPassword(control:any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  
  checkInUseEmail(control:any) {
    // mimic http database access
    let db = ["jack@torchwood.com"];
    return new Observable(observer => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  
  getErrorEmail() {
    return this.formGroup.get("email").hasError("required")
      ? "Field is required"
      : this.formGroup.get("email").hasError("pattern")
      ? "Not a valid emailaddress"
      : this.formGroup.get("email").hasError("alreadyInUse")
      ? "This emailaddress is already in use"
      : "";
  }
  
  getErrorPassword() {
    return this.formGroup.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.formGroup.get("password").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }
  
  onSubmit(post: any) {
    this.checkoutService.post({
      "total":this.total, 
      "address": this.address, 
      "cartId":this.cartService.getCart().cartId, 
      "username":localStorage.getItem("user"),
      "deliveryBoy":"null",
      "orderStatus":1 }).subscribe(data => {
        this.post = "Guardado con exito!!!";
        this.cartService.createCart();
        this.router.navigate(['/store'])
        .then(() => {
          window.location.reload();
        });
      });

  }
  close(){
    this.dialog.closeAll();
  }
}
