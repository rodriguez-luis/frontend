import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: string = 'http://localhost:8080/v1/user/';
  currentUser: string ="null";
  constructor(private http: HttpClient) { }

  getUser(username:string): Observable<User> {
    return this.http.get<User>(this.url+username);
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  setSession(username:string):void{
    this.currentUser = username;
  }

}
