import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Atoms
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { LabelComponent } from './atoms/label/label.component';
import { IconComponent } from './atoms/icon/icon.component';
import { BadgeComponent } from './atoms/badge/badge.component';
import { RatingStarsComponent } from './atoms/rating-stars/rating-stars.component';
import { PriceTagComponent } from './atoms/price-tag/price-tag.component';
import { AvatarComponent } from './atoms/avatar/avatar.component';

// Molecules
import { FormFieldComponent } from './molecules/form-field/form-field.component';
import { ImageUploadComponent } from './molecules/image-upload/image-upload.component'; // ⬅️ NUEVO

// Organisms
import { LoginFormComponent } from './organisms/login-form/login-form.component';
import { RegisterFormComponent } from './organisms/register-form/register-form.component';

const ATOMIC_COMPONENTS = [
  // Atoms
  ButtonComponent,
  InputComponent,
  LabelComponent,
  IconComponent,
  BadgeComponent,
  RatingStarsComponent,
  PriceTagComponent,
  AvatarComponent,
  // Molecules
  FormFieldComponent,
  ImageUploadComponent,
  // Organisms
  LoginFormComponent,
  RegisterFormComponent,
];

@NgModule({
  declarations: [...ATOMIC_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...ATOMIC_COMPONENTS],
})
export class AtomicModule {}
