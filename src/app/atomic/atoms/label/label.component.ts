import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: false
})
export class LabelComponent {
  @Input() for?: string;
  @Input() required: boolean = false;
  @Input() optional: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
