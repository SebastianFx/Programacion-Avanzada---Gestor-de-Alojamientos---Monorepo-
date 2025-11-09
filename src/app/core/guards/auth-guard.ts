import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      console.log('Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    // Verificar roles si la ruta los requiere
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = this.authService.getRoles();
      const hasRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        console.log('Usuario sin permisos suficientes');
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
