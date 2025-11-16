import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt: string = 'Avatar';
  @Input() name?: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';

  imageError: boolean = false;

  get initials(): string {
    if (!this.name) return '?';
    
    const names = this.name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return this.name.substring(0, 2).toUpperCase();
  }

  get avatarClasses(): string {
    return `avatar avatar--${this.size} avatar--${this.shape}`;
  }

  onImageError(): void {
    this.imageError = true;
  }
}
