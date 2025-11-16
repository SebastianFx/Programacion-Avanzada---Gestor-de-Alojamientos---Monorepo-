import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
  ],
})
export class StatsSectionComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  // Datos mock para el dashboard
  mockStatistics = {
    totalUsuarios: 1250,
    totalAlojamientos: 450,
    totalReservas: 3200,
    totalCiudades: 12,
  };

  // Configuración del gráfico Donut - Métricas Clave
  public doughnutChartLabels: string[] = ['Usuarios Registrados', 'Alojamientos Disponibles'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [70, 30], // Porcentajes según requerimiento
        backgroundColor: ['#d9b777', '#8b6914'],
        hoverBackgroundColor: ['#c4a05f', '#745a11'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  // Configuración del gráfico de Barras - Reservas por Mes
  public barChartLabels: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Reservas',
        data: [320, 450, 520, 480, 610, 580],
        backgroundColor: '#d9b777',
        hoverBackgroundColor: '#c4a05f',
        borderColor: '#8b6914',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          color: '#666',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.loadMockStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga estadísticas mock para demostración
   */
  loadMockStatistics(): void {
    this.isLoading = true;

    // Simular carga
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
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
    this.loadMockStatistics();
  }
}
