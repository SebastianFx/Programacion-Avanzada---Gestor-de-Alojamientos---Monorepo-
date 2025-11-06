import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Atoms
import { ButtonComponent } from './atoms/button/button';
import { InputComponent } from './atoms/input/input';
import { LabelComponent } from './atoms/label/label';

// Molecules
import { FormFieldComponent } from './molecules/form-field/form-field';

// Organisms
import { LoginFormComponent } from './organisms/login-form/login-form';

// Templates
import { AuthTemplateComponent } from './templates/auth-template/auth-template';

@NgModule({
  declarations: [
    // Atoms
    ButtonComponent,
    InputComponent,
    LabelComponent,
    // Molecules
    FormFieldComponent,
    // Organisms
    LoginFormComponent,
    // Templates
    AuthTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // Exportamos todo para usar en otros módulos
    ButtonComponent,
    InputComponent,
    LabelComponent,
    FormFieldComponent,
    LoginFormComponent,
    AuthTemplateComponent,
  ],
})
export class AtomicModule {}
