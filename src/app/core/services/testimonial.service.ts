import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Testimonial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  constructor() {}

  /**
   * Obtiene testimonios de usuarios para la landing
   * Por ahora solo mock, ya que no hay tabla de testimonios en BD
   */
  getTestimonials(): Observable<Testimonial[]> {
    return of(this.getMockTestimonials());
  }

  /**
   * Mock de testimonios para la landing
   */
  private getMockTestimonials(): Testimonial[] {
    return [
      {
        id: 1,
        userName: 'María González',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        comment: 'Excelente experiencia, encontré el alojamiento perfecto para mis vacaciones familiares. La plataforma es muy fácil de usar.',
        date: new Date('2024-10-15'),
        city: 'Armenia'
      },
      {
        id: 2,
        userName: 'Carlos Ramírez',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        comment: 'Como anfitrión, he podido gestionar mis propiedades de manera eficiente. Las reservas llegan constantemente.',
        date: new Date('2024-10-20'),
        city: 'Salento'
      },
      {
        id: 3,
        userName: 'Ana Martínez',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 4,
        comment: 'Gran variedad de alojamientos en el Quindío. Los precios son justos y el proceso de reserva es muy sencillo.',
        date: new Date('2024-11-01'),
        city: 'Filandia'
      }
    ];
  }
}
