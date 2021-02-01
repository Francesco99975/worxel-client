import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Department } from './department.model';

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

  addDepartment() {

  }

  updateDepartment() {

  }

  removeDepartment() {

  }
}
