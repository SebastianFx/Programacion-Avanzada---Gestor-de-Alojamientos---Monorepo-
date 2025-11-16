import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent {
  @Input() form!: FormGroup;
  @Input() loading: boolean = false;
  @Input() errorMessage: string = '';
  
  @Output() submitForm = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>();

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.form.valid && !this.loading) {
      this.submitForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onForgotPassword(): void {
    this.forgotPassword.emit();
  }
}
