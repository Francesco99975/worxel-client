import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DepartmentsService } from './departments.service';
import { tap, map } from "rxjs/operators";
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsResolverService implements Resolve<Department[]> {

  constructor(private http: HttpClient, private departments: DepartmentsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.departments.getDepartments().length == 0) {
      return this.http.get("http://localhost:5000/departments").pipe(
        map((depts: any[]) => {
          return depts.map((dept: any) => {
            return {id: dept._id, name: dept.name}
          })
        }), 
        tap((depts: Department[]) => this.departments.setDepartments(depts))
      );
    }
  }
}
