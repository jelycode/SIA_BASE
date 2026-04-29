import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [style.width]="width()" [class]="labelClass()">
      {{ text() }}
      @if (required()) {
        <span class="required-mark">*</span>
      }
    </label>
  `,
  styleUrls: ['./ui-label.component.scss']
})
export class UiLabelComponent {
  text = input.required<string>();
  width = input<string>('auto');
  required = input<boolean>(false);
  variant = input<'default' | 'bold' | 'section'>('default');

  labelClass = computed(() => `ui-label ui-label--${this.variant()}`);
}