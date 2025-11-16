import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el token
    const token = this.authService.getToken();

    // Si existe el token, clonamos la petición y añadimos el header de Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('🔑 JWT Interceptor - Token añadido a la petición:', request.url);
      console.log('📋 Authorization Header:', `Bearer ${token.substring(0, 20)}...`);
    } else {
      console.warn('⚠️ JWT Interceptor - No hay token disponible para:', request.url);
    }

    // Manejar la petición y posibles errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Logs detallados de error
        if (error.status === 401) {
          console.error('❌ Error 401 - No autorizado. Cerrando sesión...');
          this.authService.logout();
        } else if (error.status === 403) {
          console.error('❌ Error 403 - Acceso prohibido. Verificar permisos del usuario.');
          console.error('URL solicitada:', request.url);
          console.error('Detalles del error:', error);
        } else {
          console.error('❌ Error HTTP:', error.status, error.message);
        }

        return throwError(() => error);
      })
    );
  }
}
