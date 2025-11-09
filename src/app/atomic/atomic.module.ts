import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Atoms
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { LabelComponent } from './atoms/label/label.component';
import { IconComponent } from './atoms/icon/icon.component';

// Molecules
import { FormFieldComponent } from './molecules/form-field/form-field.component';

// Organisms
import { LoginFormComponent } from './organisms/login-form/login-form.component';

const ATOMIC_COMPONENTS = [
  // Atoms
  ButtonComponent,
  InputComponent,
  LabelComponent,
  IconComponent,
  // Molecules
  FormFieldComponent,
  // Organisms
  LoginFormComponent
];

@NgModule({
  declarations: [...ATOMIC_COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [...ATOMIC_COMPONENTS]
})
export class AtomicModule { }
