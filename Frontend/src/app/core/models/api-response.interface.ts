/**
 * Interfaz genérica para las respuestas de la API
 * Coincide con el formato del backend Spring Boot
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
  message?: string;
}

/**
 * Interfaz para errores de la API
 */
export interface ApiError {
  success: false;
  error: string;
  message: string;
}
