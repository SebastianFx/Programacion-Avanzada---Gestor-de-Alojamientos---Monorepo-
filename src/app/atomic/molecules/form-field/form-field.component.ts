import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: false
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() id?: string;
  @Input() errorMessages?: { [key: string]: string };

  get showError(): boolean {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get showSuccess(): boolean {
    return this.control && this.control.valid && (this.control.dirty || this.control.touched);
  }

  get errorMessage(): string {
    if (!this.showError || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;
    const errorKey = Object.keys(errors)[0];

    if (this.errorMessages && this.errorMessages[errorKey]) {
      return this.errorMessages[errorKey];
    }

    // Mensajes de error por defecto
    const defaultMessages: { [key: string]: string } = {
      required: 'Este campo es requerido',
      email: 'Ingresa un email válido',
      minlength: `Mínimo ${errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${errors['maxlength']?.requiredLength} caracteres`,
      pattern: 'Formato inválido',
      min: `El valor mínimo es ${errors['min']?.min}`,
      max: `El valor máximo es ${errors['max']?.max}`
    };

    return defaultMessages[errorKey] || 'Error de validación';
  }
}
