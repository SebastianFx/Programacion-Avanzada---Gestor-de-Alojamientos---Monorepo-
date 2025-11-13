import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { SearchBarComponent } from './molecules/search-bar/search-bar.component';
import { AccommodationCardComponent } from './molecules/accommodation-card/accommodation-card.component';
import { FeatureCardComponent } from './molecules/feature-card/feature-card.component';
import { StatCardComponent } from './molecules/stat-card/stat-card.component';
import { TestimonialCardComponent } from './molecules/testimonial-card/testimonial-card.component';

// Organisms
import { LoginFormComponent } from './organisms/login-form/login-form.component';
import { RegisterFormComponent } from './organisms/register-form/register-form.component';
import { NavbarComponent } from './organisms/navbar/navbar.component';
import { FooterComponent } from './organisms/footer/footer.component';
import { HeroSectionComponent } from './organisms/hero-section/hero-section.component';
import { FeaturedGridComponent } from './organisms/featured-grid/featured-grid.component';
import { FeaturesSectionComponent } from './organisms/features-section/features-section.component';
import { TestimonialsSectionComponent } from './organisms/testimonials-section/testimonials-section.component';
import { StatsSectionComponent } from './organisms/stats-section/stats-section.component';

// Non-standalone components (declared in the module)
const MODULE_COMPONENTS = [
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
  SearchBarComponent,
  FeatureCardComponent,
  StatCardComponent,
  TestimonialCardComponent,
  // Organisms
  LoginFormComponent,
  RegisterFormComponent,
  NavbarComponent,
  FooterComponent,
  HeroSectionComponent,
  FeaturesSectionComponent,
  TestimonialsSectionComponent,
];

// Standalone components (imported in the module)
const STANDALONE_COMPONENTS = [
  AccommodationCardComponent,
  FeaturedGridComponent,
  StatsSectionComponent,
];

@NgModule({
  declarations: [...MODULE_COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ...STANDALONE_COMPONENTS,
  ],
  exports: [...MODULE_COMPONENTS, ...STANDALONE_COMPONENTS],
})
export class AtomicModule {}
