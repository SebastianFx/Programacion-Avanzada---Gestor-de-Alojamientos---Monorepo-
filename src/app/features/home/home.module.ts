import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { AtomicModule } from '../../atomic/atomic.module';

// Pages
import { LandingComponent } from './pages/landing/landing.component';

// Services
import { AccommodationService, StatisticsService, TestimonialService } from '../../core/services';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, HttpClientModule, HomeRoutingModule, AtomicModule],
  providers: [AccommodationService, StatisticsService, TestimonialService],
})
export class HomeModule {}
