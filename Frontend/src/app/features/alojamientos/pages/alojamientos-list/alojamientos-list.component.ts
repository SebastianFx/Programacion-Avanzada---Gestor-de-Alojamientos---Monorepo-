import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccommodationService } from '../../../../core/services/accommodation.service';
import { FeaturedAccommodation } from '../../../../core/models';
import { AtomicModule } from '../../../../atomic/atomic.module';

@Component({
  selector: 'app-alojamientos-list',
  standalone: true,
  imports: [CommonModule, AtomicModule],
  templateUrl: './alojamientos-list.component.html',
  styleUrls: ['./alojamientos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlojamientosListComponent implements OnInit {
  private readonly accommodationService = inject(AccommodationService);
  private readonly router = inject(Router);

  // Signals para gestionar el estado
  alojamientos = signal<FeaturedAccommodation[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAlojamientos();
  }

  /**
   * Carga todos los alojamientos desde el backend
   */
  private loadAlojamientos(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.accommodationService.getAlojamientos().subscribe({
      next: (data) => {
        this.alojamientos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los alojamientos. Por favor, intenta nuevamente.');
        this.isLoading.set(false);
        console.error('Error loading accommodations:', err);
      },
    });
  }

  /**
   * Maneja el clic en una tarjeta de alojamiento
   * @param id ID del alojamiento seleccionado
   */
  onCardClick(id: number): void {
    // Navegación a detalle del alojamiento (implementar cuando esté listo)
    console.log('Alojamiento seleccionado:', id);
    // this.router.navigate(['/alojamientos', id]);
  }

  /**
   * Reintentar la carga de alojamientos
   */
  retry(): void {
    this.loadAlojamientos();
  }
}
