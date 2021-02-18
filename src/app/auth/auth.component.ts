import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.login = params.login;
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(null, Validators.required),
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
          this.auth.login(this.form.get('type').value, this.form.get('email').value, this.form.get('password').value)
          .subscribe(() => this.router.navigate(["/business/schedule"]), 
          (err: any) => {
            console.log(err);
            this.loading = false; 
            this.error = true;
            this.errorMsg = "Could not login!";
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
          this.auth.signup(this.form.get('name').value, this.form.get('email').value, this.form.get('password').value)
          .subscribe((res: any) => {
            this.loading = false;
            this.login = true;
            console.log(res);
          }, (err: any) => {
            console.log(err);
            this.loading = false;
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
