import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationService } from '../../../core/services';
import { FeaturedAccommodation } from '../../../core/models';

@Component({
  selector: 'app-featured-grid',
  templateUrl: './featured-grid.component.html',
  styleUrls: ['./featured-grid.component.scss'],
  standalone: false
})
export class FeaturedGridComponent implements OnInit {
  accommodations: FeaturedAccommodation[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private accommodationService: AccommodationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    this.isLoading = true;
    this.error = null;

    this.accommodationService.getFeaturedAccommodations()
      .subscribe({
        next: (data) => {
          this.accommodations = data.slice(0, 6); // Máximo 6 según HU-V002
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading accommodations:', error);
          this.error = 'No se pudieron cargar los alojamientos. Por favor, intenta de nuevo.';
          this.isLoading = false;
        }
      });
  }

  onAccommodationClick(accommodationId: number): void {
    // Redirigir a registro/login si no está autenticado (HU-V002)
    // TODO: Verificar autenticación antes de redirigir
    console.log('Accommodation clicked:', accommodationId);
    this.router.navigate(['/auth/register'], {
      queryParams: { returnUrl: `/accommodations/${accommodationId}` }
    });
  }

  onViewAllClick(): void {
    this.router.navigate(['/auth/register'], {
      queryParams: { returnUrl: '/accommodations' }
    });
  }
}
