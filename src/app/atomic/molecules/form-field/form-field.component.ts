import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, ReactiveFormsModule],
})
export class FormFieldComponent {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  control = input.required<FormControl>();
  icon = input<string | undefined>(undefined);
}
