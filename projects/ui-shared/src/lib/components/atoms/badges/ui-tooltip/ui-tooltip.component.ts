import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss']
})
export class UiTooltipComponent {
  // Contenido del tooltip
  text = input.required<string>();
  // Posición del tooltip (se usará para clases CSS o lógica de posicionamiento)
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
}