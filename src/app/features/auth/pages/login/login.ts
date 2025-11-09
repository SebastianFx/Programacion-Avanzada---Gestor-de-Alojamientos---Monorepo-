import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  error?: string;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.error = undefined;

      const credentials = {
        email: this.form.value.username,
        password: this.form.value.password,
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.isLoading = false;

          // Redirigir según el rol
          const role = response.usuario.rol.nombreRol;
          if (role === 'ADMINISTRADOR') {
            this.router.navigate(['/admin']);
          } else if (role === 'ANFITRION') {
            this.router.navigate(['/anfitrion']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.isLoading = false;
          this.error = 'Usuario o contraseña incorrectos';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onForgotPassword() {
    console.log('Redirigir a recuperación de contraseña');
    this.router.navigate(['/auth/forgot-password']);
  }
}
