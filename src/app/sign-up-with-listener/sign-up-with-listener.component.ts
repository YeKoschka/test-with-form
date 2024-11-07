import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { catchError, combineLatest, map, of, startWith, tap } from 'rxjs';


@Component({
  selector: 'app-sign-up-with-listener',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sign-up-with-listener.component.html',
  styleUrl: './sign-up-with-listener.component.scss'
})
export class SignUpWithListenerComponent {
  signupForm: FormGroup;
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  commonError: string = '';
  formValid$: any;
  isFormValid$: any;

  constructor() {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  ngOnInit(): void {
    const email$ = this.signupForm.get('email')!.valueChanges.pipe(
      startWith(''),
      map(value => value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '' : 'Invalid email format')
    );

    const password$ = this.signupForm.get('password')!.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 6 ? '' : 'Password must be at least 6 characters')
    );

    const confirmPassword$ = combineLatest([
      this.signupForm.get('password')!.valueChanges.pipe(startWith('')),
      this.signupForm.get('confirmPassword')!.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([password, confirmPassword]) => password === confirmPassword ? '' : 'Passwords do not match')
    );

    this.formValid$ = combineLatest([email$, password$, confirmPassword$]).pipe(
      tap(([emailError, passwordError, confirmPasswordError]) => {
        setTimeout(() => {
          this.emailError = emailError;
          if (emailError) {
            this.signupForm.controls.email.setErrors({ email: { mismatch: true } });
          }
          this.passwordError = passwordError;
          if (passwordError) {
            this.signupForm.controls.password.setErrors({ password: { minLength: true } });
          }
          this.confirmPasswordError = confirmPasswordError;
          if (confirmPasswordError) {
            this.signupForm.controls.confirmPassword.setErrors({ confirmPassword: { mismatch: true } });
          }
        })
      }),
      map(([emailError, passwordError, confirmPasswordError]) =>
        !emailError && !passwordError && !confirmPasswordError
      )
    );

    this.isFormValid$ = combineLatest([
      this.formValid$,
      this.signupForm.statusChanges.pipe(
        map(() => this.signupForm.touched),
        startWith(false)
      )
    ]).pipe(
      map(([formValid]) => {
        console.log(formValid)
        return formValid
      }),
      map(([formValid, formTouched]) => formValid && formTouched)
    );
  }


  onSubmit() {
    if (this.signupForm.valid) {
      this.simulateNetworkRequest(this.signupForm.value)
        .pipe(
          catchError(error => {
            this.commonError = 'An error occurred during signup. Please try again.';
            return of(null);
          })
        )
        .subscribe();
    }
  }

  onReset() {
    this.signupForm.reset();
  }

  private simulateNetworkRequest(formData: any) {
    console.log('Simulating network request with data:', formData);
    return of({ success: true }).pipe(
      tap(() => {
        alert('Signup successful!');
        this.onReset();
      })
    );
  }

}


