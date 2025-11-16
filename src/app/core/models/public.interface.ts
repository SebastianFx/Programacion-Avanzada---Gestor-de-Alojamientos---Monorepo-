/**
 * Interfaz para alojamiento destacado
 */
export interface FeaturedAccommodation {
  id: number;
  titulo: string;
  ciudad: string;
  precioPorNoche: number;
  imagenPrincipal: string;
  calificacionPromedio?: number;
  destacado: boolean;
}

/**
 * Interfaz para estadísticas de la plataforma
 */
export interface PlatformStatistics {
  totalAlojamientos: number;
  totalUsuarios: number;
  totalCiudades: number;
  totalReservas: number;
}

/**
 * Interfaz para ciudades disponibles
 */
export interface City {
  ciudad: string;
  cantidadAlojamientos: number;
}

/**
 * Interfaz para la respuesta de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
  message?: string;
}
