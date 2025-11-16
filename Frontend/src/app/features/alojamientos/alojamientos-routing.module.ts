import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlojamientosListComponent } from './pages/alojamientos-list/alojamientos-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlojamientosListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlojamientosRoutingModule {}
