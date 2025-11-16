import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { FeaturedAccommodation, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private readonly apiUrl = `${environment.apiUrl}/api/public/accommodations`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los alojamientos destacados para la landing page
   * Máximo 6 alojamientos según HU-V002
   *
   * @returns Observable con array de alojamientos destacados
   */
  getFeaturedAccommodations(): Observable<FeaturedAccommodation[]> {
    return this.http.get<ApiResponse<FeaturedAccommodation[]>>(`${this.apiUrl}/featured`).pipe(
      retry(2), // Reintentar 2 veces en caso de error de red
      map((response) => {
        if (response.success && response.data) {
          // El backend ya limita a 6, pero lo aseguramos aquí también
          return response.data.slice(0, 6);
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   * @param error Error HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
      console.error('Error del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`
      );
    }

    return throwError(() => new Error(errorMessage));
  }
}
