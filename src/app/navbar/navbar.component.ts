import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  type: number = 0;
  constructor(public sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getUser("luisito").subscribe( user => this.type = user.privilege);
  }
}
