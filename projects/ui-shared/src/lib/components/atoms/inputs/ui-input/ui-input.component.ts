import { Component, input, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UiTooltipComponent } from '../../badges/ui-tooltip/ui-tooltip.component';
import { UiTooltipDirective } from '../../badges/ui-tooltip/ui-tooltip.directive';

@Component({
  selector: 'lib-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiTooltipDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss'
})
export class UiInputComponent implements ControlValueAccessor {
  label         = input<string>('');
  /** 'top' | 'left' — solo aplica cuando label tiene valor */
  labelPosition = input<'top' | 'left' | 'right'>('top');
  id            = input<string>(`ui-input-${Math.random().toString(36).substring(2, 9)}`);
  type          = input<string>('text');
  placeholder   = input<string>('');
  required      = input<boolean>(false);
  readonly      = input<boolean>(false);
  hint          = input<string>('');
  icon          = input<string>();
  width         = input<string>('100%');
  tooltipText   = input<string>('');
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
  
  // Estado
  value    = signal<string>('');
  disabled = false;
  isInvalid = signal(false);

  onChange: any  = () => {};
  onTouched: any = () => {};

  handleInput(event: any) {
    this.value.set(event.target.value);
    this.onChange(this.value());
  }

  onBlur() {
    this.onTouched();
  }

  getErrorMessage(): string {
    return 'Este campo es requerido';
  }

  // ── ControlValueAccessor ─────────────────────────────────────────────────
  writeValue(val: any): void         { this.value.set(val || ''); }
  registerOnChange(fn: any): void    { this.onChange = fn; }
  registerOnTouched(fn: any): void   { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
