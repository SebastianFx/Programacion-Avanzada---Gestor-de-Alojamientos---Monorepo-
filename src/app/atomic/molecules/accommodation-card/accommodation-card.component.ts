import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeaturedAccommodation } from '../../../core/models';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  standalone: false
})
export class AccommodationCardComponent {
  @Input() accommodation!: FeaturedAccommodation;
  @Output() cardClick = new EventEmitter<number>();

  imageError = false;

  onCardClick(): void {
    this.cardClick.emit(this.accommodation.id);
  }

  onImageError(): void {
    this.imageError = true;
  }

  get fallbackImage(): string {
    return 'https://via.placeholder.com/800x600/d9b777/ffffff?text=Alojamiento';
  }
}
