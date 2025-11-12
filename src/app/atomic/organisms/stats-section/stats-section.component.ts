import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../core/services';
import { Statistics } from '../../../core/models';

interface StatDisplay {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
}

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss'],
  standalone: false
})
export class StatsSectionComponent implements OnInit {
  stats: StatDisplay[] = [];
  isLoading = true;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics()
      .subscribe({
        next: (data: Statistics) => {
          this.stats = [
            {
              value: data.totalAccommodations,
              label: 'Alojamientos',
              icon: 'home',
              suffix: '+'
            },
            {
              value: data.totalUsers,
              label: 'Usuarios',
              icon: 'users',
              suffix: '+'
            },
            {
              value: data.totalCities,
              label: 'Ciudades',
              icon: 'map-pin'
            },
            {
              value: data.completedReservations,
              label: 'Reservas',
              icon: 'calendar-check',
              suffix: '+'
            }
          ];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          this.isLoading = false;
        }
      });
  }
}
