import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Department } from './department.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  onChange = new Subject<Department[]>();

  private departments: Department[] = []; 

  constructor(private http: HttpClient) {}

  setDepartments(depts: Department[]) {
   this.departments = depts;
   this.onChange.next(this.departments.slice());
  }

  getDepartments() {
    return this.departments.slice();
  }

  addDepartment(newDept: string) {
    return this.http.post("http://localhost:5000/departments/add", {name: newDept})
      .pipe(tap((res: any) => {
        this.departments.push(res.department);
        this.onChange.next(this.departments.slice());
      }));
  }

  updateDepartment(updatedDept: Department) {
    return this.http.put(`http://localhost:5000/departments/update/${updatedDept.id}`, {name: updatedDept.name})
      .pipe(tap((res: any) => {
        const index = this.departments.findIndex((dept) => dept.id === updatedDept.id);
        if(index >= 0) {
          this.departments[index] = res.department;
          this.onChange.next(this.departments.slice());
        }
      }));
  }

  removeDepartment(id: string) {
    return this.http.delete(`http://localhost:5000/departments/delete/${id}`)
      .pipe(tap(() => {
        this.departments = this.departments.filter((dept => dept.id !== id));
        this.onChange.next(this.departments.slice());
      }));
  }
}
