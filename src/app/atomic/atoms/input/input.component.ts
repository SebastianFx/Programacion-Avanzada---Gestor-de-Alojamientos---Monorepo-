import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
  @Input() icon?: string;

  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get inputType(): string {
    if (this.type === 'password') {
      return this.hidePassword ? 'password' : 'text';
    }
    return this.type;
  }
}
