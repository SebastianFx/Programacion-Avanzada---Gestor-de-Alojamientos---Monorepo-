import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlojamientosRoutingModule } from './alojamientos-routing.module';
import { AtomicModule } from '../../atomic/atomic.module';
import { AlojamientosListComponent } from './pages/alojamientos-list/alojamientos-list.component';

@NgModule({
  declarations: [
    // Vacío, porque el componente es Standalone
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AlojamientosRoutingModule,
    AtomicModule,
    AlojamientosListComponent // <-- IMPORTADO CORRECTAMENTE AQUÍ
  ]
})
export class AlojamientosModule { }
