import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import './app/chart-config'; // Configuración de Chart.js

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
