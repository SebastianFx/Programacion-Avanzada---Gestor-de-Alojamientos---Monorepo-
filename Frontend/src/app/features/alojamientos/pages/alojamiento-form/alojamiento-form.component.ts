import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationService } from '../../../../core/services/accommodation.service';

@Component({
  selector: 'app-alojamiento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alojamiento-form.component.html',
  styleUrls: ['./alojamiento-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlojamientoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly accommodationService = inject(AccommodationService);
  private readonly router = inject(Router);

  // Signals para gestionar el estado
  isSubmitting = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<boolean>(false);

  // Formulario reactivo
  alojamientoForm!: FormGroup;

  // Opciones para el select de tipo
  tiposAlojamiento = [
    { value: 'CASA', label: 'Casa' },
    { value: 'APARTAMENTO', label: 'Apartamento' },
    { value: 'FINCA', label: 'Finca' },
  ];

  // Para manejo de archivo
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa el formulario reactivo con validaciones
   */
  private initializeForm(): void {
    this.alojamientoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', [Validators.required, Validators.maxLength(2000)]],
      ciudad: ['', [Validators.required, Validators.maxLength(100)]],
      direccionCompleta: ['', [Validators.required, Validators.maxLength(500)]],
      precioPorNoche: ['', [Validators.required, Validators.min(1)]],
      capacidadMaxima: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      servicios: [''],
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.alojamientoForm.invalid) {
      this.alojamientoForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    // Preparar los datos del formulario
    const formData = this.alojamientoForm.value;

    // Convertir servicios de string a array si es necesario
    if (formData.servicios && typeof formData.servicios === 'string') {
      formData.servicios = formData.servicios
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    } else {
      formData.servicios = [];
    }

    // Llamar al servicio
    this.accommodationService.crearAlojamiento(formData).subscribe({
      next: (response) => {
        console.log('Alojamiento creado:', response);

        // Si hay una imagen seleccionada, subirla
        if (this.selectedFile && this.imagePreview) {
          const alojamientoId = response.id;
          this.uploadImage(alojamientoId);
        } else {
          // Si no hay imagen, simplemente marcar como éxito
          this.handleSuccess();
        }
      },
      error: (err) => {
        this.error.set(err.message || 'Error al crear el alojamiento');
        this.isSubmitting.set(false);
        console.error('Error creating accommodation:', err);
      },
    });
  }

  /**
   * Sube la imagen del alojamiento
   */
  private uploadImage(alojamientoId: number): void {
    if (!this.imagePreview) {
      this.handleSuccess();
      return;
    }

    // Enviar la imagen como base64
    this.accommodationService.subirFotoAlojamiento(alojamientoId, this.imagePreview).subscribe({
      next: () => {
        console.log('Foto subida exitosamente');
        this.handleSuccess();
      },
      error: (err) => {
        console.error('Error al subir foto:', err);
        // Aunque falle la foto, el alojamiento ya fue creado, así que marcamos éxito
        this.handleSuccess();
      },
    });
  }

  /**
   * Maneja el éxito de la creación
   */
  private handleSuccess(): void {
    this.success.set(true);
    this.isSubmitting.set(false);
    // Redirigir a la lista después de 1.5 segundos
    setTimeout(() => {
      this.router.navigate(['/alojamientos']);
    }, 1500);
  }

  /**
   * Maneja la selección de archivo
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.error.set('El archivo es demasiado grande. Máximo 5MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        this.error.set('Solo se permiten archivos de imagen');
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Remueve el archivo seleccionado
   */
  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.imagePreview = null;

    // Limpiar el input
    const input = document.getElementById('foto') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  /**
   * Cancela y regresa a la lista
   */
  onCancel(): void {
    this.router.navigate(['/alojamientos']);
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.alojamientoForm.get(fieldName);
    return !!(field && field.hasError(errorType) && field.touched);
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.alojamientoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
