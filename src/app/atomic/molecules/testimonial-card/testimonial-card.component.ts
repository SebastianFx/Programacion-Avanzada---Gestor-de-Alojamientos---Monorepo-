import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../core/models';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss'],
  standalone: false
})
export class TestimonialCardComponent {
  @Input() testimonial!: Testimonial;

  get formattedDate(): string {
    if (!this.testimonial?.date) return '';
    
    const date = new Date(this.testimonial.date);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
  }
}
