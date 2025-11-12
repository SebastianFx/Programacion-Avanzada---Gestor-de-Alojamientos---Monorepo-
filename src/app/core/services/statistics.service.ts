import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Statistics } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/api/public/statistics`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las estadísticas generales del sistema para la landing
   */
  getStatistics(): Observable<Statistics> {
    // TODO: Descomentar cuando el backend esté listo
    // return this.http.get<Statistics>(this.apiUrl);
    
    // Mock temporal para desarrollo
    return of(this.getMockStatistics());
  }

  /**
   * Mock de datos para desarrollo
   * ELIMINAR cuando el backend esté implementado
   */
  private getMockStatistics(): Statistics {
    return {
      totalAccommodations: 150,
      totalUsers: 1250,
      totalCities: 12,
      completedReservations: 3420
    };
  }
}
