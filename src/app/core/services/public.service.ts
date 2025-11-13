import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  FeaturedAccommodation,
  PlatformStatistics,
  City,
  ApiResponse,
} from '../models/public.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private readonly apiUrl = `${environment.apiUrl}/api/public`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los 6 alojamientos destacados
   */
  getFeaturedAccommodations(): Observable<FeaturedAccommodation[]> {
    return this.http
      .get<ApiResponse<FeaturedAccommodation[]>>(`${this.apiUrl}/accommodations/featured`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error al obtener alojamientos destacados:', error);
          throw error;
        })
      );
  }

  /**
   * Obtiene las estadísticas de la plataforma
   */
  getPlatformStatistics(): Observable<PlatformStatistics> {
    return this.http.get<ApiResponse<PlatformStatistics>>(`${this.apiUrl}/statistics`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error al obtener estadísticas:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la lista de ciudades con alojamientos
   */
  getAvailableCities(): Observable<City[]> {
    return this.http.get<ApiResponse<City[]>>(`${this.apiUrl}/cities`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error al obtener ciudades:', error);
        throw error;
      })
    );
  }
}
