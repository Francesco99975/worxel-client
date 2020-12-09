import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  homeLinks: string[] = ["Signup", "Login"];

  isBusinessLoggedIn: boolean = false;
  businessLinks: string[] = ["Schedule", "Employees", "Departments", "Settings"];

  get links() {
    return this.isBusinessLoggedIn ? this.businessLinks : this.homeLinks
  };

  constructor() { }

  ngOnInit(): void {
  }

  onToggleMenu(backdrop: any, mobilenav: any): void {
    backdrop.classList.toggle('open');
    mobilenav.classList.toggle('open');
  }
}
