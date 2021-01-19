import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: boolean;
  loading: boolean;
  error: boolean;
  formError: boolean;
  errorMsg: string;

  form: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(0, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required)
    });
  }

  onDismissed() {
    this.error = false;
  }

  onToggleActive(el: HTMLElement) {
    el.classList.toggle('active');
  }

  onOptionSelected(opt: HTMLElement, index: number) {
    const txt = opt.textContent;
    const siblings = document.querySelectorAll('.sel__box__options');
    const placeholder = document.querySelector('.sel__placeholder');
    const select: HTMLSelectElement = document.querySelector('#select-profession');

    siblings.forEach((s, i) => {
      if(i != index) {
        s.classList.remove('selected');
      }
    });
    opt.classList.add('selected');
    
    placeholder.textContent = txt;
    select.selectedIndex = index + 1;
    this.form.get('type').setValue(index + 1);
  }

  onSubmit() {
    if (this.login) {
      this.form.get('name').setValue('unused');
      this.form.get('repassword').setValue('unused');
      if(this.form.valid) {      
          this.loading = true;
          this.http.post("http://localhost:5000/auth/login", {
            type: this.form.get('type').value,
            email: this.form.get('email').value, 
            password: this.form.get('password').value
          }).subscribe((res: any) => {
            this.loading = false;
            console.log(res);
          }, (err: any) => {
            console.log(err);
            this.error = true;
            this.errorMsg = "Could not signup!";
          });
      } else {
        this.formError = true;
      }
    } else {
      if(this.form.valid) {
        if(this.form.get('password').value !== this.form.get('repassword').value) {
          this.error = true;
          this.errorMsg = "Passwords don't match!";
          return;
        } else {
          this.loading = true;
          this.http.post("http://localhost:5000/auth/signup", {
            name: this.form.get('name').value, 
            email: this.form.get('email').value, 
            password: this.form.get('password').value
          }).subscribe((res: any) => {
            this.loading = false;
            console.log(res);
          }, (err: any) => {
            console.log(err);
            this.error = true;
            this.errorMsg = "Could not signup!";
          });
        }
      } else {
        this.formError = true;
      }
    }
}

}
