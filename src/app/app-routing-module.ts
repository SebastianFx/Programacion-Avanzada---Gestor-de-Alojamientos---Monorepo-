import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';
import { SelectivePreloadStrategy } from './core/strategies/selective-preload-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard-module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { preload: true }, // Preload importante
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'anfitrion',
    loadChildren: () =>
      import('./features/anfitrion/anfitrion-module').then((m) => m.AnfitrionModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ANFITRION', 'ADMINISTRADOR'] },
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'alojamientos',
    loadChildren: () =>
      import('./features/alojamientos/alojamientos-module').then((m) => m.AlojamientosModule),
  },
  {
    path: 'reservas',
    loadChildren: () => import('./features/reservas/reservas-module').then((m) => m.ReservasModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./features/unauthorized/unauthorized-module').then((m) => m.UnauthorizedModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./features/not-found/not-found-module').then((m) => m.NotFoundModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadStrategy, // Usar estrategia personalizada
      enableTracing: false, // Activar solo para debugging
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
