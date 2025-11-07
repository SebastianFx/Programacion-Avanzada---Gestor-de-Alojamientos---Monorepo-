import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

// Atomic Components
import { ButtonComponent } from './atoms/button/button';
import { InputComponent } from './atoms/input/input';
import { LabelComponent } from './atoms/label/label';
import { FormFieldComponent } from './molecules/form-field/form-field';
import { LoginFormComponent } from './organisms/login-form/login-form';
import { AuthTemplateComponent } from './templates/auth-template/auth-template';
import { DesignShowcaseComponent } from './pages/design-showcase/design-showcase';

// Rutas internas del módulo atomic
const atomicRoutes: Routes = [
  {
    path: 'pages/design-showcase',
    component: DesignShowcaseComponent,
  },
];

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LabelComponent,
    FormFieldComponent,
    LoginFormComponent,
    AuthTemplateComponent,
    DesignShowcaseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule.forChild(atomicRoutes),
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    LabelComponent,
    FormFieldComponent,
    LoginFormComponent,
    AuthTemplateComponent,
    DesignShowcaseComponent,
  ],
})
export class AtomicModule {}
