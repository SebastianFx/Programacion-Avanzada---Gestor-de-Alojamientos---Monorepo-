import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccommodationService } from '../../../core/services';
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
  accommodations: FeaturedAccommodation[] = [];
  isLoading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private accommodationService: AccommodationService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga los alojamientos destacados desde el backend
   */
  loadAccommodations(): void {
    this.isLoading = true;
    this.error = null;

    this.accommodationService
      .getFeaturedAccommodations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.accommodations = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading accommodations:', error);
          this.error =
            'No se pudieron cargar los alojamientos. Por favor, intenta de nuevo más tarde.';
          this.isLoading = false;
        },
      });
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
    this.loadAccommodations();
  }

  /**
   * TrackBy function para optimizar el rendering de la lista
   */
  trackByAccommodationId(_index: number, accommodation: FeaturedAccommodation): number {
    return accommodation.id;
  }
}
