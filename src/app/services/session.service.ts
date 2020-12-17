import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: string = 'http://localhost:8080/v1/user/';
  currentUser: any;
  constructor(private http: HttpClient) { }

  getUser(username:string): Observable<User> {
    return this.http.get<User>(this.url+username);
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setSession(user:User):void{
    localStorage.setItem("user",user.username);
    localStorage.setItem("type",user.privilege.toString());
    this.currentUser = user; 
  }

}
