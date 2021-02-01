import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
