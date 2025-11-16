import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlojamientosListComponent } from './pages/alojamientos-list/alojamientos-list.component';
import { AlojamientoFormComponent } from './pages/alojamiento-form/alojamiento-form.component';
import { HostGuard } from '../../core/guards/host.guard';

const routes: Routes = [
  {
    path: '',
    component: AlojamientosListComponent,
  },
  {
    path: 'crear',
    component: AlojamientoFormComponent,
    canActivate: [HostGuard], // Solo anfitriones pueden crear alojamientos
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlojamientosRoutingModule {}
