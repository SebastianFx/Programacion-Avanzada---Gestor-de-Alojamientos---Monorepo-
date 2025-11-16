import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: false
})
export class RegisterFormComponent {
  @Input() form!: FormGroup;
  @Input() loading: boolean = false;
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  
  @Output() submitForm = new EventEmitter<void>();

  tiposUsuario = [
    { value: 'USUARIO', label: 'Usuario' },
    { value: 'ANFITRION', label: 'Anfitrión' }
  ];

  // Fecha máxima (hoy) para el date picker
  get maxDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Fecha mínima (hace 100 años) para el date picker
  get minDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 100);
    return date.toISOString().split('T')[0];
  }

  get nombreControl() {
    return this.form.get('nombre') as FormControl;
  }

  get apellidoControl() {
    return this.form.get('apellido') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get telefonoControl() {
    return this.form.get('telefono') as FormControl;
  }

  get fechaNacimientoControl() {
    return this.form.get('fechaNacimiento') as FormControl;
  }

  get fotoPerfilControl() {
    return this.form.get('fotoPerfil') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword') as FormControl;
  }

  get tipoUsuarioControl() {
    return this.form.get('tipoUsuario') as FormControl;
  }

  get passwordsMatch(): boolean {
    const password = this.passwordControl?.value;
    const confirmPassword = this.confirmPasswordControl?.value;
    return password === confirmPassword;
  }

  get showPasswordMismatchError(): boolean {
    return (
      this.confirmPasswordControl?.touched &&
      this.confirmPasswordControl?.value !== '' &&
      !this.passwordsMatch
    );
  }

  onSubmit(): void {
    if (this.form.valid && !this.loading) {
      this.submitForm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
