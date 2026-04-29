import { Component, input, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  // Inputs como Signals para tu HTML complejo
  label = input<string>('');
  id = input<string>(`ui-input-${Math.random().toString(36).substring(2, 9)}`);
  type = input<string>('text');
  placeholder = input<string>('');
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  hint = input<string>('');
  icon = input<string>(); // Recibe clase de Font Awesome: 'fa fa-search'
  width = input<string>('100%');

  // Estado
  value = '';
  disabled = false;
  isInvalid = signal(false); // Simulación de estado de validación

  onChange: any = () => {};
  onTouched: any = () => {};

  handleInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  getErrorMessage(): string {
    return 'Este campo es requerido'; // Lógica de error simplificada
  }

  // ControlValueAccessor
  writeValue(val: any): void { this.value = val || ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}