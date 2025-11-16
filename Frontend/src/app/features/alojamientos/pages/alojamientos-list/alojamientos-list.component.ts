import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationService } from '../../../../core/services/accommodation.service';
import { FeaturedAccommodation } from '../../../../core/models';
import { AtomicModule } from '../../../../atomic/atomic.module';
import { AlojamientoDetailModalComponent } from '../../components/alojamiento-detail-modal/alojamiento-detail-modal.component';

@Component({
  selector: 'app-alojamientos-list',
  standalone: true,
  imports: [CommonModule, AtomicModule, AlojamientoDetailModalComponent],
  templateUrl: './alojamientos-list.component.html',
  styleUrls: ['./alojamientos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlojamientosListComponent implements OnInit {
  private readonly accommodationService = inject(AccommodationService);

  // Signals para gestionar el estado
  alojamientos = signal<FeaturedAccommodation[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Signals para el modal
  selectedAccommodation = signal<FeaturedAccommodation | null>(null);
  isModalOpen = signal<boolean>(false);

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
   * Abre el modal con los detalles del alojamiento
   * @param id ID del alojamiento seleccionado
   */
  onCardClick(id: number): void {
    const alojamiento = this.alojamientos().find((a) => a.id === id);
    if (alojamiento) {
      this.openModal(alojamiento);
    }
  }

  /**
   * Abre el modal de detalle con el alojamiento seleccionado
   * @param alojamiento Alojamiento a mostrar en el modal
   */
  openModal(alojamiento: FeaturedAccommodation): void {
    this.selectedAccommodation.set(alojamiento);
    this.isModalOpen.set(true);
  }

  /**
   * Cierra el modal de detalle
   */
  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedAccommodation.set(null);
  }

  /**
   * Reintentar la carga de alojamientos
   */
  retry(): void {
    this.loadAlojamientos();
  }
}
