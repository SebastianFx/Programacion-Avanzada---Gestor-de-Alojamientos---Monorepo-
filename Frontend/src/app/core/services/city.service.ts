import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, shareReplay } from 'rxjs/operators';
import { City, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly apiUrl = `${environment.apiUrl}/api/public/cities`;
  private cache$?: Observable<City[]>;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de ciudades con alojamientos disponibles
   * Implementa caché para evitar llamadas repetidas
   *
   * @returns Observable con array de ciudades
   */
  getAvailableCities(): Observable<City[]> {
    // Si ya existe en caché, retornar del caché
    if (!this.cache$) {
      this.cache$ = this.http.get<ApiResponse<City[]>>(this.apiUrl).pipe(
        retry(2), // Reintentar 2 veces en caso de error
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          return [];
        }),
        shareReplay(1), // Cachear el resultado
        catchError(this.handleError)
      );
    }

    return this.cache$;
  }

  /**
   * Limpia el caché de ciudades
   * Útil para refrescar datos cuando sea necesario
   */
  clearCache(): void {
    this.cache$ = undefined;
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error al cargar ciudades';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      console.error('Error del cliente:', error.error.message);
    } else {
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`
      );
    }

    return throwError(() => new Error(errorMessage));
  }
}
