import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatisticsService } from '../../../core/services';
import { Statistics } from '../../../core/models';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class StatsSectionComponent implements OnInit, OnDestroy {
  statistics: Statistics | null = null;
  isLoading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  // Configuración de las tarjetas de estadísticas
  statsConfig = [
    {
      key: 'totalAlojamientos',
      label: 'Alojamientos Disponibles',
      icon: 'home',
      color: 'primary',
    },
    {
      key: 'totalUsuarios',
      label: 'Usuarios Registrados',
      icon: 'people',
      color: 'accent',
    },
    {
      key: 'totalCiudades',
      label: 'Ciudades Disponibles',
      icon: 'location_city',
      color: 'warn',
    },
    {
      key: 'totalReservas',
      label: 'Reservas Completadas',
      icon: 'check_circle',
      color: 'primary',
    },
  ];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga las estadísticas desde el backend
   */
  loadStatistics(): void {
    this.isLoading = true;
    this.error = null;

    this.statisticsService
      .getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.statistics = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          this.error = 'No se pudieron cargar las estadísticas.';
          this.isLoading = false;
        },
      });
  }

  /**
   * Obtiene el valor de una estadística específica
   */
  getStatValue(key: string): number {
    return this.statistics ? (this.statistics as any)[key] : 0;
  }

  /**
   * Formatea números grandes con separador de miles
   */
  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-CO').format(value);
  }

  /**
   * Reintentar carga de estadísticas
   */
  retry(): void {
    this.statisticsService.clearCache();
    this.loadStatistics();
  }
}
