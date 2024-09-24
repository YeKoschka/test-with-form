import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passShouldMatch } from '../validators/pass-should-match.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    }, {
      validators: passShouldMatch
    })
  });


  private initialFormValues: any;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(console.log)
  }

  ngOnDestroy(): void {
  }


  onSubmit(e: Event) {
    // server sending logic
    this.formDir.resetForm(this.initialFormValues);
  }
  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

}
