import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ListItemComponent } from "../shared/list-item/list-item.component";
import { CommonModule } from '@angular/common';

import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [BusinessComponent, ScheduleComponent, DepartmentListComponent, EmployeeListComponent, ListItemComponent],
  imports: [
    RouterModule,
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ColorPickerModule
  ]
})
export class BusinessModule { }