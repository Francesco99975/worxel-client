import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = "token";
  private USERID_KEY = "userid";
  private USERNAME_KEY = "username";

  token: string;
  tokenExpiryDate: Date;
  username: string;
  userId: string;
  changed: Subject<void> = new Subject();

  constructor() { }

  loadCredentials() {
    this.token = localStorage.getItem(this.TOKEN_KEY);
    this.userId = localStorage.getItem(this.USERID_KEY);
    this.username = localStorage.getItem(this.USERNAME_KEY);
  }

  login(res: any) {
    this.token = res.token;
    this.userId = res.userId;
    this.username = res.username;
    localStorage.setItem(this.TOKEN_KEY, this.token);
    localStorage.setItem(this.USERID_KEY, this.userId);
    localStorage.setItem(this.USERNAME_KEY, this.username);
    this.changed.next();
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.username = null;
    localStorage.clear();
    this.changed.next();
  }

  loggedIn(): boolean {
    return this.token != null;
  }
}
