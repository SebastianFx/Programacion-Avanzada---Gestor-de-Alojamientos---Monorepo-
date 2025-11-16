import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: false
})
export class StatCardComponent implements OnInit, OnDestroy {
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() suffix: string = '';
  @Input() animationDuration: number = 2000; // ms

  displayValue: number = 0;
  private animationInterval?: any;

  ngOnInit(): void {
    this.animateCounter();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private animateCounter(): void {
    const increment = this.value / (this.animationDuration / 16); // 60fps
    let current = 0;

    this.animationInterval = setInterval(() => {
      current += increment;
      if (current >= this.value) {
        this.displayValue = this.value;
        clearInterval(this.animationInterval);
      } else {
        this.displayValue = Math.floor(current);
      }
    }, 16);
  }

  get formattedValue(): string {
    return new Intl.NumberFormat('es-CO').format(this.displayValue);
  }

  // Map de íconos SVG
  get iconPath(): string {
    const icons: { [key: string]: string } = {
      'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
      'users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M16 3.13a4 4 0 0 1 0 7.75',
      'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
      'calendar-check': 'M16 2v4 M8 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M9 16l2 2 4-4',
      'trending-up': 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6'
    };

    return this.icon ? (icons[this.icon] || '') : '';
  }
}
