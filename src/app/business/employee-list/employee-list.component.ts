import { flatten } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Department } from '../department-list/department.model';
import { DepartmentsService } from '../department-list/departments.service';
import { Employee } from './employee.model';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  emps: Employee[] = [];
  depts: Department[] = [];
  sub: Subscription;
  deptSub: Subscription;
  updating: number;
  formError: boolean;
  form: FormGroup;
  inModal: boolean;

  constructor(private employees: EmployeesService, private departments: DepartmentsService) {
    this.updating = -1;
    this.formError = false;
    this.inModal = false;
   }

  ngOnInit(): void {
    this.emps = this.employees.getEmployees();
    this.depts = this.departments.getDepartments();
    this.sub = this.employees.onChange.subscribe((emps: Employee[]) => {
      this.emps = emps;
    });
    this.deptSub = this.departments.onChange.subscribe((depts: Department[]) => {
      this.depts = depts;
    });
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      departments: new FormArray(this.depts.map(() => new FormControl(false)), Validators.required),
      color: new FormControl('#000000', Validators.required),
      manager: new FormControl(false, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.deptSub.unsubscribe();
  }

  get controls() {
    return (this.form.get("departments") as FormArray).controls;
  }

  private fillForm(index: number) {
    const controls: FormControl[] = this.depts.map(dept => dept.id).map(deptId => {
      if(this.emps[index].departments.map(d => d.id).includes(deptId)) {
        return new FormControl(true);
      } else {
        return new FormControl(false);
      }
    });
    this.form.setValue({
      firstname: this.emps[index].firstname,
      lastname: this.emps[index].lastname,
      departments: this.form.get('departments').value,
      color: this.emps[index].color,
      manager: this.emps[index].manager,
      email: 'unused@u.uu',
      password: 'unuseddddddd'
    });
    this.depts.forEach((_, index) => {
      (this.form.get('departments') as FormArray).setControl(index, controls[index]);
    });
  }

  onStartModal(backdrop: HTMLElement, index: number) {
    backdrop.classList.add('open');
    this.updating = index;
    if(this.updating >= 0) {
      this.fillForm(index);
    }
    this.inModal = true;
  }

  onCreate(backdrop: HTMLElement) {
    if(this.form.valid) {
      const deptsRes: boolean[] = this.form.get('departments').value;
      let deptIds: string[] = [];
      deptsRes.forEach((res, index) => {
        if(res) deptIds.push(this.depts[index].id);
      });

      this.employees.addEmployee(
        this.form.get('firstname').value,
        this.form.get('lastname').value,
        deptIds,
        this.form.get('color').value,
        this.form.get('manager').value,
        this.form.get('email').value,
        this.form.get('password').value
      ).subscribe((res: any) => {
        console.log(res.message);
        this.form.reset();
        this.form.get('color').setValue("#000000");
        this.onClose(backdrop);
      });
    }
  }

  onUpdate(backdrop: HTMLElement) {
    if(this.form.valid) {
      const deptsRes: boolean[] = this.form.get('departments').value;
      let deptIds: string[] = [];
      deptsRes.forEach((res, index) => {
        if(res) deptIds.push(this.depts[index].id);
      });

      this.employees.updateEmployee(
        this.emps[this.updating].id,
        this.form.get('firstname').value,
        this.form.get('lastname').value,
        deptIds,
        this.form.get('color').value,
        this.form.get('manager').value
      )
      .subscribe((res: any) => {
        console.log(res.message);
        this.onClose(backdrop);
      });
    }
  }

  onRemove(index: number) {
    this.employees.removeEmployee(this.emps[index].id).subscribe(res => console.log(res));
  }

  onClose(backdrop: HTMLElement) {
    backdrop.classList.remove('open');
    this.updating = -1;
    this.inModal = false;
  }

}
