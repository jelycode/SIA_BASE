import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'lib-ui-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-radio.component.html',
  styleUrls: ['./ui-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiRadioComponent),
      multi: true,
    },
  ],
})
export class UiRadioComponent implements ControlValueAccessor {
  /** Título del grupo (ej. «Forma de pago») */
  label = input<string>('');
  options = input<RadioOption[]>([]);
  /** `horizontal` = en línea; `vertical` = lista */
  orientation = input<'horizontal' | 'vertical'>('vertical');
  width = input<string>('100%');
  /** Nombre del grupo `<input type="radio">`; si se omite se genera uno único */
  groupName = input<string>('');

  readonly autoGroupName = `ui-radio-${Math.random().toString(36).slice(2, 11)}`;
  readonly groupTitleId = `uir-title-${Math.random().toString(36).slice(2, 9)}`;

  readonly selectedValue = signal<string | number | null>(null);

  optionTrack(opt: RadioOption): string | number {
    return opt.value;
  }

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};
  private cvaDisabled = false;

  resolvedGroupName(): string {
    return this.groupName().trim() || this.autoGroupName;
  }

  isDisabled(): boolean {
    return this.cvaDisabled;
  }

  optionValueStr(opt: RadioOption): string {
    return String(opt.value);
  }

  isChecked(opt: RadioOption): boolean {
    const cur = this.selectedValue();
    if (cur === null || cur === undefined) {
      return false;
    }
    return cur === opt.value || String(cur) === String(opt.value);
  }

  pick(opt: RadioOption): void {
    if (this.isDisabled()) {
      return;
    }
    this.selectedValue.set(opt.value);
    this.onChange(opt.value);
    this.onTouched();
  }

  writeValue(val: unknown): void {
    if (val === null || val === undefined || val === '') {
      this.selectedValue.set(null);
      return;
    }
    this.selectedValue.set(val as string | number);
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
  }
}
