import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from '../../../../atomic/molecules/search-bar/search-bar.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: false
})
export class LandingComponent implements OnInit {
  
  ngOnInit(): void {
    // Scroll to top on component load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(criteria: SearchCriteria): void {
    console.log('Search from landing:', criteria);
    // TODO: Implementar lógica de búsqueda
    // Podría redirigir a una página de resultados o filtrar alojamientos
  }
}
