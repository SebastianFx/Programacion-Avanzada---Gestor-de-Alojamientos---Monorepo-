import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/alojamiento/api/auth'; // RUTA DEL BACKEND

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Login de usuario
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      })
    );
  }

  /**
   * Registro de usuario
   */
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, userData).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      })
    );
  }

  /**
   * Logout de usuario
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Opcional: verificar si el token ha expirado
    return !this.isTokenExpired(token);
  }

  /**
   * Obtiene el token del localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Maneja la respuesta de autenticación
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  /**
   * Carga el usuario del localStorage al iniciar
   */
  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error al cargar usuario del storage', error);
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * Verifica si el token ha expirado
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() >= exp;
    } catch (error) {
      return true;
    }
  }

  /**
   * Solicitar recuperación de contraseña
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  /**
   * Resetear contraseña
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  /**
   * Verifica si el usuario actual tiene rol de Anfitrión
   */
  isHost(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'ANFITRION' || user?.rol === 'ADMINISTRADOR';
  }

  /**
   * Verifica si el usuario actual tiene rol de Administrador
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'ADMINISTRADOR';
  }

  /**
   * Obtiene el rol del usuario desde el token JWT
   */
  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || null;
    } catch (error) {
      console.error('Error al extraer rol del token', error);
      return null;
    }
  }
}
