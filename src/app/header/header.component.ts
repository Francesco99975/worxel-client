import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../models/link';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  title: string;
  homeLinks: Link[] = [new Link("Signup", "/auth"), new Link("Login", "/auth", true)];

  isBusinessLoggedIn: boolean = false;
  businessLinks: Link[] = [ 
    new Link("Schedule", "/business/schedule"), 
    new Link("Employees", "/business/employees"), 
    new Link("Departments", "/business/departments"), 
    new Link("Settings", "/business/settings")
];

  authSub: Subscription;

  get links() {
    return this.isBusinessLoggedIn ? this.businessLinks : this.homeLinks
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSub = this.auth.user.subscribe((userData: User) => {
      if(userData && userData.token != null) {
        this.title = userData.username;
        this.isBusinessLoggedIn = true;
      } else {
        this.title = "Worxel";
        this.isBusinessLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onToggleMenu(backdrop: any, mobilenav: any): void {
    backdrop.classList.toggle('open');
    mobilenav.classList.toggle('open');
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(["/auth"]);
  }
}
