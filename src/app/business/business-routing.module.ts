import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BusinessComponent } from './business.component';

import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    { 
        path: '', 
        component: BusinessComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: ScheduleComponent} 
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }