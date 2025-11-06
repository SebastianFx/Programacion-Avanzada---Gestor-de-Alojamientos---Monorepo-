import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class InputComponent {
  placeholder = input<string>('');
  type = input<string>('text');
  control = input.required<FormControl>();
  icon = input<string | undefined>(undefined);

  hidePassword = signal(true);

  togglePasswordVisibility(): void {
    this.hidePassword.update(value => !value);
  }

  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.hidePassword() ? 'password' : 'text';
    }
    return this.type();
  });
}
