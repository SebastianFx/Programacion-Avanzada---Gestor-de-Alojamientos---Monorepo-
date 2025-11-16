import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', // ← CAMBIO: De '/auth/login' a '/home'
    pathMatch: 'full',
  },
  {
    path: 'home', // ← NUEVA RUTA: Landing Page
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'alojamientos',
    loadChildren: () =>
      import('./features/alojamientos/alojamientos.module').then((m) => m.AlojamientosModule),
  },
  // Descomentar cuando dashboard esté listo:
  //{
  //  path: 'dashboard',
  //  canActivate: [AuthGuard],
  //  loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  //},
  {
    path: '**',
    redirectTo: '/home', // ← CAMBIO: De '/auth/login' a '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
