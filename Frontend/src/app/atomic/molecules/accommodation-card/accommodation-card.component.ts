import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FeaturedAccommodation } from '../../../core/models';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class AccommodationCardComponent {
  @Input() accommodation!: FeaturedAccommodation;
  @Output() cardClick = new EventEmitter<number>();

  imageError = false;

  /**
   * Emite evento cuando se hace click en la tarjeta
   */
  onCardClick(): void {
    this.cardClick.emit(this.accommodation.id);
  }

  /**
   * Maneja error de carga de imagen y muestra fallback
   */
  onImageError(): void {
    this.imageError = true;
  }

  /**
   * Imagen de respaldo cuando la principal falla
   */
  get fallbackImage(): string {
    return 'https://via.placeholder.com/800x600/d9b777/ffffff?text=Alojamiento';
  }

  /**
   * Formatea el precio para mostrar
   */
  get formattedPrice(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(this.accommodation.precioPorNoche);
  }

  /**
   * Obtiene array de estrellas para rating
   */
  get ratingStars(): number[] {
    const rating = this.accommodation.calificacionPromedio || 0;
    return Array(Math.round(rating)).fill(0);
  }

  /**
   * Obtiene la imagen a mostrar (principal o fallback)
   */
  get displayImage(): string {
    return this.imageError ? this.fallbackImage : this.accommodation.imagenPrincipal;
  }
}
