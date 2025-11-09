import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Precargar solo rutas marcadas con data: { preload: true }
    if (route.data && route.data['preload']) {
      console.log('Precargando módulo:', route.path);
      return load();
    }

    return of(null);
  }
}
