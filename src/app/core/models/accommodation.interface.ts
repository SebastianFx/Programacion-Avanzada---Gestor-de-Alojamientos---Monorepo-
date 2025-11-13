/**
 * Interfaz para alojamiento destacado
 * Coincide con FeaturedAccommodationDTO del backend
 */
export interface FeaturedAccommodation {
  id: number;
  titulo: string; // Nombre en español como en el backend
  ciudad: string;
  precioPorNoche: number;
  imagenPrincipal: string;
  calificacionPromedio?: number;
  destacado: boolean;
}

/**
 * Interfaz completa para alojamiento
 * Para uso futuro con más detalles
 */
export interface Accommodation {
  id: number;
  titulo: string;
  descripcion: string;
  ciudad: string;
  direccionCompleta: string;
  precioPorNoche: number;
  capacidadMaxima: number;
  tipo: string;
  servicios: string[];
  estado: string;
  imagenPrincipal?: string;
  calificacionPromedio?: number;
  anfitrionNombre?: string;
}
