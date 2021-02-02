import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from './department.model';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  depts: Department[] = [];
  form: FormGroup;
  formError: boolean;

  constructor(private departments: DepartmentsService) { }

  ngOnInit(): void {
    this.depts = this.departments.getDepartments();
    this.departments.onChange.subscribe((depts: Department[]) => {
      this.depts = depts;
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.formError = false;
  }

  onCreate() {
    if(this.form.valid) {
      this.departments.addDepartment(this.form.get('name').value);
    } else {
      this.formError = true;
    }
  }

  onStartRename() {

  }

  onStartRemove() {

  }

  onRename(newName: string, index: number) {
    this.departments.updateDepartment(new Department(this.depts[index].id, newName));
  }

  onRemove(index: number) {
    this.departments.removeDepartment(this.depts[index].id);
  }

}
