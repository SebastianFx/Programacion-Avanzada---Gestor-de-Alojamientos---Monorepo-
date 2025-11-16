import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedAccommodation } from '../../../../core/models';

@Component({
  selector: 'app-alojamiento-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alojamiento-detail-modal.component.html',
  styleUrls: ['./alojamiento-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlojamientoDetailModalComponent {
  @Input() alojamiento!: FeaturedAccommodation;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.close.emit();
  }

  /**
   * Previene el cierre al hacer clic dentro del modal
   */
  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }
}
