/**
 * Interfaz para representar un alojamiento en el sistema
 */
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  capacity: number;
  bathrooms: number;
  featured: boolean;
  available: boolean;
  mainImage: string;
  rating?: number;
  reviewCount?: number;
  hostName?: string;
}

/**
 * DTO simplificado para alojamientos destacados en landing
 */
export interface FeaturedAccommodation {
  id: number;
  title: string;
  city: string;
  price: number;
  mainImage: string;
  rating?: number;
  featured: boolean;
}
