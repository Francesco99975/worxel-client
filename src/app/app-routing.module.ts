import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "", redirectTo: "/home", pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule) 
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: "business",
    loadChildren: () => import("./business/business.module").then((m) => m.BusinessModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
