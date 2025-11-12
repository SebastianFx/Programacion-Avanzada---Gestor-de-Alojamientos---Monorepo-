import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  standalone: false
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  @Input() showNumber: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get stars(): Array<'full' | 'half' | 'empty'> {
    const starsArray: Array<'full' | 'half' | 'empty'> = [];
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
      starsArray.push('full');
    }

    // Media estrella
    if (hasHalfStar && fullStars < this.maxStars) {
      starsArray.push('half');
    }

    // Estrellas vacías
    const emptyStars = this.maxStars - starsArray.length;
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push('empty');
    }

    return starsArray;
  }

  get sizeClass(): string {
    return `rating-stars--${this.size}`;
  }
}
