/**
 * Interfaz para testimonios de usuarios
 */
export interface Testimonial {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  city?: string;
}
