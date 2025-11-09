import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    // Configurar idioma por defecto
    this.translate.setDefaultLang('es');

    // Cargar idioma guardado o usar español
    const savedLang = localStorage.getItem('language') || 'es';
    this.translate.use(savedLang);
  }

  /**
   * Cambia el idioma actual
   */
  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  /**
   * Obtiene los idiomas disponibles
   */
  getAvailableLanguages(): string[] {
    return ['es', 'en'];
  }
}
