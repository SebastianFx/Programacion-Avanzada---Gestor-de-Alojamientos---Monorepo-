import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FeaturedAccommodation } from '../../../core/models';
import { AccommodationCardComponent } from '../../molecules/accommodation-card/accommodation-card.component';

@Component({
  selector: 'app-featured-grid',
  templateUrl: './featured-grid.component.html',
  styleUrls: ['./featured-grid.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AccommodationCardComponent,
  ],
})
export class FeaturedGridComponent implements OnInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  accommodations: FeaturedAccommodation[] = [];
  isLoading = false;
  error: string | null = null;
  canScrollLeft = false;
  canScrollRight = true;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockAccommodations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga alojamientos mock para demostración
   */
  loadMockAccommodations(): void {
    this.isLoading = true;

    // Simular carga con timeout
    setTimeout(() => {
      this.accommodations = [
        {
          id: 1,
          titulo: 'Hermosa Casa en el Eje Cafetero',
          ciudad: 'Pereira',
          precioPorNoche: 250000,
          imagenPrincipal: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
          calificacionPromedio: 4.8,
          destacado: true
        },
        {
          id: 2,
          titulo: 'Finca con Vista a las Montañas',
          ciudad: 'Armenia',
          precioPorNoche: 320000,
          imagenPrincipal: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
          calificacionPromedio: 4.9,
          destacado: true
        },
        {
          id: 3,
          titulo: 'Apartamento Moderno Centro',
          ciudad: 'Manizales',
          precioPorNoche: 180000,
          imagenPrincipal: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
          calificacionPromedio: 4.5,
          destacado: true
        },
        {
          id: 4,
          titulo: 'Cabaña Rústica en el Bosque',
          ciudad: 'Salento',
          precioPorNoche: 280000,
          imagenPrincipal: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
          calificacionPromedio: 5.0,
          destacado: true
        }
      ];
      this.isLoading = false;

      // Verificar scroll después de cargar
      setTimeout(() => this.checkScrollButtons(), 100);
    }, 800);
  }

  /**
   * Maneja el click en un alojamiento
   * Redirige a registro si no está autenticado (HU-V002)
   */
  onAccommodationClick(accommodationId: number): void {
    // Verificar si hay token de autenticación
    const token = localStorage.getItem('auth_token');

    if (token) {
      // Usuario autenticado: ir a detalle del alojamiento
      this.router.navigate(['/accommodations', accommodationId]);
    } else {
      // Usuario NO autenticado: redirigir a registro con returnUrl
      this.router.navigate(['/auth/register'], {
        queryParams: { returnUrl: `/accommodations/${accommodationId}` },
      });
    }
  }

  /**
   * Maneja el click en "Ver todos"
   * Redirige a registro si no está autenticado
   */
  onViewAllClick(): void {
    const token = localStorage.getItem('auth_token');

    if (token) {
      this.router.navigate(['/accommodations']);
    } else {
      this.router.navigate(['/auth/register'], {
        queryParams: { returnUrl: '/accommodations' },
      });
    }
  }

  /**
   * Reintentar carga de alojamientos
   */
  retry(): void {
    this.loadMockAccommodations();
  }

  /**
   * Scroll del carrusel hacia la izquierda
   */
  scrollLeft(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(() => this.checkScrollButtons(), 300);
    }
  }

  /**
   * Scroll del carrusel hacia la derecha
   */
  scrollRight(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => this.checkScrollButtons(), 300);
    }
  }

  /**
   * Verifica si se pueden mostrar los botones de navegación
   */
  checkScrollButtons(): void {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      this.canScrollLeft = container.scrollLeft > 0;
      this.canScrollRight =
        container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
    }
  }

  /**
   * Maneja el evento de scroll del carrusel
   */
  onCarouselScroll(): void {
    this.checkScrollButtons();
  }

  /**
   * TrackBy function para optimizar el rendering de la lista
   */
  trackByAccommodationId(_index: number, accommodation: FeaturedAccommodation): number {
    return accommodation.id;
  }
}
