import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlojamientosRoutingModule } from './alojamientos-routing.module';
import { AtomicModule } from '../../atomic/atomic.module';
import { AlojamientosListComponent } from './pages/alojamientos-list/alojamientos-list.component';
import { AlojamientoFormComponent } from './pages/alojamiento-form/alojamiento-form.component';

@NgModule({
  declarations: [
    // Vacío, porque los componentes son Standalone
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlojamientosRoutingModule,
    AtomicModule,
    AlojamientosListComponent,
    AlojamientoFormComponent
  ]
})
export class AlojamientosModule { }
