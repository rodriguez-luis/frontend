import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  username:string = "";
  password:string = "";
  constructor(public sessionService: SessionService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  getUser(){
    return this.sessionService.getUser(this.username).subscribe(us => this.user = us);
  }
  onSubmit(){
    this.getUser();
    if (this.user.password == this.password){
      this.sessionService.setSession(this.user);
      window.location.reload();
    }else{
      alert("user y/o password incorrectos");
    }
  }

}
