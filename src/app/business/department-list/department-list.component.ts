import { Component, OnInit } from '@angular/core';
import { Department } from './department.model';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  depts: Department[] = [];

  constructor(private departments: DepartmentsService) { }

  ngOnInit(): void {
    this.depts = this.departments.getDepartments();
    this.departments.onChange.subscribe((depts: Department[]) => {
      this.depts = depts;
    });
  }

}
