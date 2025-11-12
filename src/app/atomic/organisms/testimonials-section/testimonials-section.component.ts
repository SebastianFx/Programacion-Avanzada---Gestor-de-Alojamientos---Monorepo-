import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../core/services';
import { Testimonial } from '../../../core/models';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
  standalone: false
})
export class TestimonialsSectionComponent implements OnInit {
  testimonials: Testimonial[] = [];
  isLoading = true;

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.testimonialService.getTestimonials()
      .subscribe({
        next: (data) => {
          this.testimonials = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading testimonials:', error);
          this.isLoading = false;
        }
      });
  }
}
