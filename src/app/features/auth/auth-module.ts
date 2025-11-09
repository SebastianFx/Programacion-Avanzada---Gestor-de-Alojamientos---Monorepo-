import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { Auth } from './auth';
import { Login } from './pages/login/login';

// Importar AtomicModule para usar los componentes del sistema de diseño
import { AtomicModule } from '../../atomic/atomic-module';

@NgModule({
  declarations: [Auth, Login],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule, // Para formularios reactivos
    AtomicModule, // Para usar componentes atómicos
  ],
})
export class AuthModule {}
