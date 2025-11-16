import { Component } from '@angular/core';
import { ServiceFeature } from '../../../core/models';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss'],
  standalone: false
})
export class FeaturesSectionComponent {
  features: ServiceFeature[] = [
    {
      id: 1,
      icon: 'shield',
      title: 'Reservas Seguras',
      description: 'Sistema de pago protegido y verificación de identidad para tu tranquilidad y seguridad.'
    },
    {
      id: 2,
      icon: 'home',
      title: 'Alojamientos Verificados',
      description: 'Todos nuestros alojamientos son inspeccionados y verificados para garantizar calidad.'
    },
    {
      id: 3,
      icon: 'headset',
      title: 'Soporte 24/7',
      description: 'Equipo de atención al cliente disponible las 24 horas para ayudarte cuando lo necesites.'
    },
    {
      id: 4,
      icon: 'star',
      title: 'Experiencias Únicas',
      description: 'Accede a alojamientos exclusivos en los mejores destinos del Eje Cafetero.'
    }
  ];
}
