import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from './employee.model';
import { tap } from 'rxjs/operators';
import { Department } from '../department-list/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  onChange: Subject<Employee[]> = new Subject();

  private employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  setEmployees(emps: Employee[]) {
    console.log(emps);
    this.employees = emps;
    this.onChange.next(this.employees.slice());
  }

  getEmployees() {
    return this.employees.slice();
  }

  addEmployee(firstname: string, lastname: string, departments: string[], color: string, manager: boolean, email: string, password: string) {
    const priority: number = this.employees.map(emp => emp.priority).sort((a, b) => b - a)[0] + 1; 
    return this.http.post("http://localhost:5000/employees/add", {firstname, lastname, departments, color, priority, manager, email, password})
      .pipe(tap((res: any) => {
        this.employees.push(new Employee({
          id: res.emp._id,
          businessId: res.emp.businessId,
          firstname: res.emp.firstname,
          lastname: res.emp.lastname,
          email: res.emp.email,
          departments: res.emp.departments.map((dept: any) => {
            return new Department(dept._id, dept.name);
          }),
          color: res.emp.color,
          manager: res.emp.manager,
          flags: res.emp.flags,
          priority: res.emp.priority,
          shifts: res.emp.shifts
        }));
        this.onChange.next(this.employees.slice());
      }));
  }

  updateEmployee(id: string, firstname: string, lastname: string, departments: string[], color: string, manager: boolean) {
    return this.http.put(`http://localhost:5000/employees/update/${id}`, {
      firstname: firstname,
      lastname: lastname,
      departments: departments, 
      color: color,  
      manager: manager
    }).pipe(tap((res: any) => {
        const index = this.employees.findIndex((emp) => emp.id === id);
        if(index >= 0) {
          this.employees[index] = new Employee({
            id: res.emp._id,
          businessId: res.emp.businessId,
          firstname: res.emp.firstname,
          lastname: res.emp.lastname,
          email: res.emp.email,
          departments: res.emp.departments.map((dept: any) => {
            return new Department(dept._id, dept.name);
          }),
          color: res.emp.color,
          manager: res.emp.manager,
          flags: res.emp.flags,
          priority: res.emp.priority,
          shifts: res.emp.shifts
          });
          this.onChange.next(this.employees.slice());
        }
      }));
  }

  removeEmployee(empId: string) {
    return this.http.delete(`http://localhost:5000/employees/delete/${empId}`)
      .pipe(tap(() => {
        this.employees = this.employees.filter((emp => emp.id !== empId));
        this.onChange.next(this.employees.slice());
      }));
  }
}
