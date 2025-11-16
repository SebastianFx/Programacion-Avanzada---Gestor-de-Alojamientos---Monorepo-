import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: false
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() color?: string;
  @Input() strokeWidth: number = 2;

  get iconPath(): string {
    // Map de íconos comunes usando SVG paths
    const icons: { [key: string]: string } = {
      'eye': 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
      'eye-off': 'M9.88 9.88a3 3 0 1 0 4.24 4.24 M10.73 5.08A11 11 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68 M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61 M2 2l20 20',
      'lock': 'M7 11V7a5 5 0 0 1 10 0v4 M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z',
      'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z M22 6l-10 7L2 6',
      'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'check': 'M20 6L9 17l-5-5',
      'x': 'M18 6L6 18 M6 6l12 12',
      'alert-circle': 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z M12 8v4 M12 16h.01'
    };

    return icons[this.name] || '';
  }

  get viewBox(): string {
    return '0 0 24 24';
  }
}
