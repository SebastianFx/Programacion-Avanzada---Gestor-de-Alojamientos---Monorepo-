import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional para proteger rutas que requieren rol de ANFITRION o ADMINISTRADOR
 * Solo permite acceso a usuarios autenticados con rol de anfitrión
 */
export const hostGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔐 HostGuard - Verificando acceso a:', state.url);

  // Verificar si está autenticado
  if (!authService.isAuthenticated()) {
    console.warn('⚠️ HostGuard - Usuario no autenticado. Redirigiendo a login...');
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Verificar si tiene rol de anfitrión
  if (authService.isHost()) {
    console.log('✅ HostGuard - Acceso permitido (rol de anfitrión)');
    return true;
  }

  console.error('❌ HostGuard - Acceso denegado. Usuario no es anfitrión.');
  console.log('Usuario actual:', authService.getCurrentUser());

  // Redirigir a home con mensaje de error
  return router.createUrlTree(['/home'], {
    queryParams: { error: 'unauthorized' }
  });
};

/**
 * Guard de clase para compatibilidad con módulos que no soportan guards funcionales
 */
@Injectable({
  providedIn: 'root'
})
export class HostGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    console.log('🔐 HostGuard (clase) - Verificando acceso a:', state.url);

    // Verificar si está autenticado
    if (!this.authService.isAuthenticated()) {
      console.warn('⚠️ HostGuard - Usuario no autenticado. Redirigiendo a login...');
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // Verificar si tiene rol de anfitrión
    if (this.authService.isHost()) {
      console.log('✅ HostGuard - Acceso permitido (rol de anfitrión)');
      return true;
    }

    console.error('❌ HostGuard - Acceso denegado. Usuario no es anfitrión.');
    console.log('Usuario actual:', this.authService.getCurrentUser());

    // Redirigir a home con mensaje de error
    return this.router.createUrlTree(['/home'], {
      queryParams: { error: 'unauthorized' }
    });
  }
}
