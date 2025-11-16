import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { FeaturedAccommodation, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private readonly apiUrl = `${environment.apiUrl}/alojamiento/api/public/alojamientos`;

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
   * Obtiene todos los alojamientos disponibles
   *
   * @returns Observable con array de todos los alojamientos
   */
  getAlojamientos(): Observable<FeaturedAccommodation[]> {
    return this.http.get<ApiResponse<FeaturedAccommodation[]>>(`${this.apiUrl}`).pipe(
      retry(2),
      map((response) => {
        if (response.success && response.data) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Crea un nuevo alojamiento
   *
   * @param data Datos del alojamiento a crear
   * @returns Observable con el alojamiento creado
   */
  crearAlojamiento(data: any): Observable<any> {
    const createUrl = `${environment.apiUrl}/alojamiento/api/anfitrion/alojamientos`;
    return this.http.post<any>(createUrl, data).pipe(
      map((response) => {
        if (response.alojamiento) {
          return response.alojamiento;
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Sube una foto para un alojamiento
   *
   * @param alojamientoId ID del alojamiento
   * @param imagenBase64 Imagen en formato base64
   * @returns Observable con la respuesta
   */
  subirFotoAlojamiento(alojamientoId: number, imagenBase64: string): Observable<any> {
    const uploadUrl = `${environment.apiUrl}/alojamiento/api/anfitrion/alojamientos/${alojamientoId}/fotos`;
    const params = new HttpParams().set('imagenUrl', imagenBase64).set('esPrincipal', 'true');

    return this.http.post<any>(uploadUrl, null, { params }).pipe(
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
