import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BusinessComponent } from './business.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentsResolverService } from './department-list/departments-resolver.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesResolverService } from './employee-list/employees-resolver.service';

import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    { 
        path: '', 
        component: BusinessComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'schedule', component: ScheduleComponent, resolve: [EmployeesResolverService, DepartmentsResolverService]} ,
            {path: 'departments', component: DepartmentListComponent, resolve: [DepartmentsResolverService]},
            {path: 'employees', component: EmployeeListComponent, resolve: [EmployeesResolverService, DepartmentsResolverService]}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }