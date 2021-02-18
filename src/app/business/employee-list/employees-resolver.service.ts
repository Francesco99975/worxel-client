import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EmployeesService } from './employees.service';
import { tap, map } from "rxjs/operators";
import { Employee } from './employee.model';
import { Department } from '../department-list/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesResolverService implements Resolve<Employee[]> {

  constructor(private http: HttpClient, private employees: EmployeesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.employees.getEmployees().length == 0) {
      return this.http.get("http://localhost:5000/employees").pipe(
        map((emps: any[]) => {
          console.log(emps);
          return emps.map((emp: any) => {
            return new Employee({
              id: emp._id, 
              businessId: emp.businessId, 
              color: emp.color, 
              departments: emp.departments.map((dept: any) => {
                return new Department(dept._id, dept.name);
              }), 
              email: emp.email,
              firstname: emp.firstname,
              lastname: emp.lastname,
              flags: emp.flags,
              manager: emp.manager,
              priority: emp.priority,
              shifts: emp.shifts
            });
          })
        }), 
        tap((emps: Employee[]) => this.employees.setEmployees(emps))
      );
    }
  }
}