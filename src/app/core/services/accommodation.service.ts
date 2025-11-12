import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FeaturedAccommodation } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiUrl = `${environment.apiUrl}/api/public/accommodations`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los alojamientos destacados para la landing page
   * Máximo 6 alojamientos según HU-V002
   */
  getFeaturedAccommodations(): Observable<FeaturedAccommodation[]> {
    // TODO: Descomentar cuando el backend esté listo
    // return this.http.get<FeaturedAccommodation[]>(`${this.apiUrl}/featured`);
    
    // Mock temporal para desarrollo
    return of(this.getMockAccommodations());
  }

  /**
   * Mock de datos para desarrollo
   * ELIMINAR cuando el backend esté implementado
   */
  private getMockAccommodations(): FeaturedAccommodation[] {
    return [
      {
        id: 1,
        title: 'Casa Campestre en Salento',
        city: 'Salento, Quindío',
        price: 250000,
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        rating: 4.8,
        featured: true
      },
      {
        id: 2,
        title: 'Apartamento Moderno Centro',
        city: 'Armenia, Quindío',
        price: 180000,
        mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        rating: 4.5,
        featured: true
      },
      {
        id: 3,
        title: 'Finca Cafetera con Piscina',
        city: 'Circasia, Quindío',
        price: 400000,
        mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        rating: 4.9,
        featured: true
      },
      {
        id: 4,
        title: 'Cabaña Romántica Bosque',
        city: 'Filandia, Quindío',
        price: 320000,
        mainImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        rating: 4.7,
        featured: true
      },
      {
        id: 5,
        title: 'Casa Familiar con Jardín',
        city: 'Calarcá, Quindío',
        price: 280000,
        mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        rating: 4.6,
        featured: true
      },
      {
        id: 6,
        title: 'Loft Urbano Moderno',
        city: 'Armenia, Quindío',
        price: 200000,
        mainImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        rating: 4.4,
        featured: true
      }
    ];
  }
}
