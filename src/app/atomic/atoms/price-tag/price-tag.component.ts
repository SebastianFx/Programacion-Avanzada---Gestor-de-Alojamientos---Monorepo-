import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-tag',
  templateUrl: './price-tag.component.html',
  styleUrls: ['./price-tag.component.scss'],
  standalone: false
})
export class PriceTagComponent {
  @Input() price: number = 0;
  @Input() currency: string = 'COP';
  @Input() period: string = 'noche';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showPeriod: boolean = true;

  get formattedPrice(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(this.price);
  }

  get sizeClass(): string {
    return `price-tag--${this.size}`;
  }
}
