import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface CheckboxOption {
  value: string | number;
  label: string;
  /**
   * Si es true y el valor no está seleccionado, se muestra el estado visual «indeterminado» (guión).
   * Al marcar la casilla, el valor pasa al array del formulario y el aspecto es «checked».
   */
  indeterminate?: boolean;
}

@Component({
  selector: 'lib-ui-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-check.component.html',
  styleUrls: ['./ui-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCheckComponent),
      multi: true,
    },
  ],
})
export class UiCheckComponent implements ControlValueAccessor {
  /** Título del grupo (ej. «Inline checkbox») */
  label = input<string>('');
  options = input<CheckboxOption[]>([]);
  /** `horizontal` = en línea; `vertical` = lista */
  orientation = input<'horizontal' | 'vertical'>('vertical');
  width = input<string>('100%');
  /** Nombre común para los inputs (accesibilidad); si se omite se genera uno único */
  groupName = input<string>('');

  readonly autoGroupName = `ui-check-${Math.random().toString(36).slice(2, 11)}`;
  readonly groupTitleId = `uic-title-${Math.random().toString(36).slice(2, 9)}`;

  readonly selectedValues = signal<(string | number)[]>([]);

  private onChange: (value: (string | number)[]) => void = () => {};
  private onTouched: () => void = () => {};
  private cvaDisabled = false;

  resolvedGroupName(): string {
    return this.groupName().trim() || this.autoGroupName;
  }

  isDisabled(): boolean {
    return this.cvaDisabled;
  }

  optionTrack(opt: CheckboxOption): string | number {
    return opt.value;
  }

  isSelected(opt: CheckboxOption): boolean {
    return this.selectedValues().some((v) => v === opt.value || String(v) === String(opt.value));
  }

  /** Indeterminado solo si la opción lo declara y aún no está marcada */
  isIndeterminate(opt: CheckboxOption): boolean {
    return !!opt.indeterminate && !this.isSelected(opt);
  }

  toggle(opt: CheckboxOption, _event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    const cur = [...this.selectedValues()];
    const idx = cur.findIndex((v) => v === opt.value || String(v) === String(opt.value));
    if (idx >= 0) {
      cur.splice(idx, 1);
    } else {
      cur.push(opt.value);
    }
    this.selectedValues.set(cur);
    this.onChange([...cur]);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: unknown): void {
    if (val == null) {
      this.selectedValues.set([]);
      return;
    }
    if (!Array.isArray(val)) {
      this.selectedValues.set([]);
      return;
    }
    this.selectedValues.set(val as (string | number)[]);
  }

  registerOnChange(fn: (value: (string | number)[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled = isDisabled;
  }
}
