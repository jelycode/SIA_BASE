import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-panel-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-panel-container.component.html',
  styleUrls: ['./ui-panel-container.component.scss']
})
export class UiPanelContainerComponent {
  // El título es obligatorio para que el componente tenga sentido.
  title = input.required<string>();

  // Inputs opcionales para personalización con valores por defecto basados en la imagen.
  borderColor = input<string>('var(--ui-border-accent,rgb(169, 185, 207))'); // Verde agua suave para borde
  titleTextColor = input<string>('var(--ui-text-accent,rgb(46, 70, 96))'); // Verde agua oscuro para texto
  
  // Colores para el degradado del título
  titleBgStartColor = input<string>('var(--ui-primary-accent-light,rgb(232, 240, 245))'); // Verde agua muy claro
  titleBgEndColor = input<string>('#ffffff'); // Blanco puro
}