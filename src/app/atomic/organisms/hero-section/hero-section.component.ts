import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCriteria } from '../../molecules/search-bar/search-bar.component';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  standalone: false
})
export class HeroSectionComponent {
  @Output() search = new EventEmitter<SearchCriteria>();

  constructor(private router: Router) {}

  onSearch(criteria: SearchCriteria): void {
    console.log('Search criteria:', criteria);
    this.search.emit(criteria);
    // TODO: Implementar navegación a página de resultados
    // this.router.navigate(['/accommodations'], { queryParams: criteria });
  }

  onExploreClick(): void {
    // Scroll suave hacia la sección de alojamientos destacados
    const featuredSection = document.getElementById('featured-accommodations');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
