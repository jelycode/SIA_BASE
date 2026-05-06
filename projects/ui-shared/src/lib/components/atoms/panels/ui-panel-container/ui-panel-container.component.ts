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
  borderColor = input<string>('var(--ui-border-accent, #a9cfc8)'); // Verde agua suave para borde
  titleTextColor = input<string>('var(--ui-text-accent, #2e6057)'); // Verde agua oscuro para texto
  
  // Colores para el degradado del título
  titleBgStartColor = input<string>('var(--ui-primary-accent-light, #e8f5f3)'); // Verde agua muy claro
  titleBgEndColor = input<string>('#ffffff'); // Blanco puro
}