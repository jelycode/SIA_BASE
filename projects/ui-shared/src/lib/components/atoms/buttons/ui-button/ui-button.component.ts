import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  text = input<string>('');
  icon = input<string>(); // Ahora recibe strings como 'fa fa-save'
  type = input<'button' | 'submit' | 'reset'>('button');
  size = input<'sm' | 'md' | 'lg'>('md');
  width = input<string>('auto');
  variant = input<string>('--color-bg-primary');
  customClass = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  heigth = input<string>('auto');

  onClick = output<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit(event);
    }
  }
}