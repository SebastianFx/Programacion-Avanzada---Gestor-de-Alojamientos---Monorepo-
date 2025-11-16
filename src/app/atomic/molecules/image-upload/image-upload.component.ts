import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Input() label: string = 'Foto de Perfil';
  @Input() required: boolean = false;
  @Input() maxSizeMB: number = 5; // Tamaño máximo en MB
  @Input() acceptedFormats: string = 'image/jpeg,image/png,image/jpg,image/webp';

  imagePreview: string | null = null;
  fileName: string = '';
  errorMessage: string = '';
  disabled: boolean = false;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    if (value) {
      this.imagePreview = value;
    } else {
      this.imagePreview = null;
      this.fileName = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.errorMessage = '';

    // Validar tipo de archivo
    if (!this.acceptedFormats.split(',').includes(file.type)) {
      this.errorMessage = 'Formato de archivo no válido. Usa JPG, PNG o WEBP.';
      return;
    }

    // Validar tamaño
    const maxSizeBytes = this.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.errorMessage = `El archivo es muy grande. Máximo ${this.maxSizeMB}MB.`;
      return;
    }

    this.fileName = file.name;

    // Convertir a base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imagePreview = base64String;
      this.onChange(base64String);
      this.onTouched();
    };
    reader.onerror = () => {
      this.errorMessage = 'Error al cargar la imagen. Intenta nuevamente.';
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.fileName = '';
    this.errorMessage = '';
    this.onChange(null);
    this.onTouched();
  }

  triggerFileInput(): void {
    if (!this.disabled) {
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      fileInput?.click();
    }
  }
}
