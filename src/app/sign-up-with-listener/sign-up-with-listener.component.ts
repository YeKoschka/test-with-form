import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { UserInfo } from '../interfaces/user-info';
import { combineLatest, filter, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-sign-up-with-listener',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sign-up-with-listener.component.html',
  styleUrl: './sign-up-with-listener.component.scss'
})
export class SignUpWithListenerComponent implements AfterViewInit {
  private initialValue: unknown;
  isValid = false;


  public userInfo: UserInfo = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  @ViewChild('email')
  email?: NgModel;

  @ViewChild('pass')
  password?: NgModel;

  @ViewChild('confirmPass')
  confirmPass?: NgModel;

  @ViewChild(NgForm)
  formDir!: NgForm;

  constructor(

  ) { }

  ngAfterViewInit(): void {

      const email$ = this.email?.valueChanges?.pipe(
        tap((res) => {
          const email = this.formDir.getControl(this.email as NgModel);

          if(!res) email?.setErrors({ required: true });
          if(res && !res.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            email.setErrors({ email: { mismatch: true } });
          }
        })
      )

      const password$ = this.password?.valueChanges?.pipe(
        tap((res) => {
          const pass = this.formDir.getControl(this.password as NgModel);

          if(!res) pass?.setErrors({ required: true });
          if(res && res.length < 6) pass?.setErrors({minLength: true});
        })
      )

      const confirmPass$ = this.confirmPass?.valueChanges?.pipe(
        tap((res) => {
          const pass = this.formDir.getControl(this.password as NgModel);
          const confirmPassword = this.formDir.getControl(this.confirmPass as NgModel);
          const errors = { passShouldMatch: { mismatch: true } };
          if(!res) confirmPassword?.setErrors({ required: true });

          if (pass?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors(errors);
          }
        })
      );

      const example = combineLatest([email$, password$, confirmPass$])

      example.pipe(
        switchMap(() => {
          console.log(this.formDir.valid);
          return this.formDir.statusChanges! ;
        }),
        filter(res => res !== 'INVALID')
      ).subscribe((res) => {
        this.isValid = true;
      })
  }

  onSubmit(e: Event) {
    // server sending logic
    this.formDir.resetForm(this.initialValue);
  }
  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialValue);
    this.isValid = false;
  }

}


