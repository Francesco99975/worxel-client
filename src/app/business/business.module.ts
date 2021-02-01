import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [BusinessComponent, ScheduleComponent],
  imports: [
    RouterModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ]
})
export class BusinessModule { }