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
  updateForm: FormGroup;
  formError: boolean;
  updating: number;

  constructor(private departments: DepartmentsService) { }

  get sortedDeptsAlpha(): Department[] {
    return this.depts.sort((a, b) => 
      a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0
    );
  } 

  ngOnInit(): void {
    this.depts = this.departments.getDepartments();
    this.departments.onChange.subscribe((depts: Department[]) => {
      this.depts = depts;
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.updating = -1;
    this.formError = false;
  }

  onCreate() {
    console.log(this.form.value);
    if(this.form.valid) {
      this.departments.addDepartment(this.form.get('name').value).subscribe((res) => console.log(res));
    } else {
      this.formError = true;
    }
  }

  onStartRename(backdrop: HTMLElement, index: number) {
    backdrop.classList.add('open');
    this.updating = index;
  }

  onClose(backdrop: HTMLElement) {
    backdrop.classList.remove('open');
    this.updating = -1;
  }

  onRename(backdrop: HTMLElement) {
    if(this.updateForm.valid) {
      this.departments.updateDepartment(new Department(this.depts[this.updating].id, this.updateForm.get('name').value)).subscribe((res) => {
        this.onClose(backdrop);
      });
    }
  }

  onRemove(index: number) {
    if(this.depts.length > 1) {
      this.departments.removeDepartment(this.depts[index].id).subscribe(res => console.log(res));
    } else {
      console.error("At least one department required!");
    }
  }

}
