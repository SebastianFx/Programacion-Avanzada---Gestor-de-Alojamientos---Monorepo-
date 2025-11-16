import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, shareReplay } from 'rxjs/operators';
import { Statistics, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly apiUrl = `${environment.apiUrl}/api/public/statistics`;
  private cache$?: Observable<Statistics>;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las estadísticas generales del sistema para la landing
   * Implementa caché para evitar llamadas repetidas
   *
   * @returns Observable con estadísticas de la plataforma
   */
  getStatistics(): Observable<Statistics> {
    // Si ya existe en caché, retornar del caché
    if (!this.cache$) {
      this.cache$ = this.http.get<ApiResponse<Statistics>>(this.apiUrl).pipe(
        retry(2), // Reintentar 2 veces en caso de error
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          // Retornar estadísticas vacías si falla
          return this.getEmptyStatistics();
        }),
        shareReplay(1), // Cachear el resultado
        catchError(this.handleError)
      );
    }

    return this.cache$;
  }

  /**
   * Limpia el caché de estadísticas
   * Útil para refrescar datos cuando sea necesario
   */
  clearCache(): void {
    this.cache$ = undefined;
  }

  /**
   * Retorna estadísticas vacías como fallback
   */
  private getEmptyStatistics(): Statistics {
    return {
      totalAlojamientos: 0,
      totalUsuarios: 0,
      totalCiudades: 0,
      totalReservas: 0,
    };
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error al cargar estadísticas';

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
