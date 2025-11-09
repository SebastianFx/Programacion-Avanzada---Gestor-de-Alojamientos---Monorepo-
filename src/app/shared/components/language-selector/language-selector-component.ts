import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language-service';

@Component({
  selector: 'app-language-selector',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="langMenu">
      <mat-icon>language</mat-icon>
    </button>
    <mat-menu #langMenu="matMenu">
      <button mat-menu-item (click)="changeLanguage('es')">
        <span>🇪🇸 Español</span>
      </button>
      <button mat-menu-item (click)="changeLanguage('en')">
        <span>🇺🇸 English</span>
      </button>
    </mat-menu>
  `,
  standalone: false,
})
export class LanguageSelectorComponent {
  constructor(public languageService: LanguageService) {}

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
