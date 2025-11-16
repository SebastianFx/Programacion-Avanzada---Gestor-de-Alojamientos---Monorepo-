import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMobileMenu();
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
    this.closeMobileMenu();
  }

  onRegister(): void {
    this.router.navigate(['/auth/register']);
    this.closeMobileMenu();
  }

  onLogout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  /**
   * Verifica si el usuario actual es anfitrión o administrador
   */
  isHost(): boolean {
    return this.authService.isHost();
  }

  /**
   * Navega a la página de crear alojamiento
   */
  onPublishAccommodation(): void {
    this.router.navigate(['/alojamientos/crear']);
    this.closeMobileMenu();
  }
}
