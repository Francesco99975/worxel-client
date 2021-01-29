import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  token: string;
  tokenExpiryDate: Date;
  private tokenExpirationTimer: any;
  username: string;
  userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  signup(name: string, email: string, password: string) {
    return this.http.post("http://localhost:5000/auth/signup", {name, email, password});
  }

  login(type: number, email: string, password: string) {
    return this.http.post("http://localhost:5000/auth/login", {type, email, password})
    .pipe(catchError(this.handleError), tap((res: any) => this.handleAuth(res.token, res.userId, res.username)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  loggedIn(): boolean {
    return this.token != null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) return;

    const user: User = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (user.token) {
      this.user.next(user);
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime(),
      );
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = "An unknown error occurred!";
    if (!error.error || !error.error.error) {
      return throwError(errorMsg);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "Email Already Taken!";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg = "Too many attempts try gain later...";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "User does not exist!";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Invalid Password! Try Again...";
        break;
      case "USER_DISABLED":
        errorMsg = "This account has been disabled!";
        break;
      default:
        break;
    }
    return throwError(errorMsg);
  }

  private handleAuth(
    token: string,
    userId: string,
    username: string,
  ) {
    const expiresIn: number = jwt_decode(token)['exp'];
    const user = new User(
      userId, 
      username, 
      token, 
      new Date(new Date().getTime() + expiresIn * 1000)
    );
      
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}

